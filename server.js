
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
var Client = require("ftp");
var fs = require("fs");
const knex = require("knex");

const app = express();
const port = process.env.PORT || 5000;

// const nodemailer = require("nodemailer");
const morgan = require("morgan");
const router = require("express").Router();
const path = require("path");
const bcrypt = require("bcrypt-nodejs");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const review = require("./controllers/review");
const reviewList = require("./controllers/getReviews");
const myReview = require("./controllers/getMyReview");
const removeReview = require("./controllers/removeReview.js");
const getTests = require("./controllers/getTests.js");
const getTest = require("./controllers/getTest.js");
const getCats = require("./controllers/getCats.js");
const getReviewsByCat = require("./controllers/getReviewsByCat.js");
var axios = require("axios");
var cheerio = require("cheerio");
var puppeteer = require("puppeteer");
// aws bucket
// const AWS = require('aws-sdk');
require("dotenv").config();
// const Busboy = require('busboy');
// const busboy = require('connect-busboy');
// const busboyBodyParser = require('busboy-body-parser')
const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
// app.use(busboy())
// app.use(busboyBodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var pg = require("pg");

//  production
//  const db = knex({
//    client: "pg",
//    connection: process.env.CONNSTRING,
//    searchPath: ["knex", "public"],
//  });


// local
const db = knex({
  client: "pg",
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'Pass1234',
    database: 'postgres'
  },
  searchPath: ["knex", "public"],
});

app.post("/api/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.post("/api/signin", signin.handleSignin(db, bcrypt));
app.post("/api/postreview", (req, res) => {
  review.handleReviewPost(req, res, db);
});
app.delete("/api/remove_review", (req, res) => {
  removeReview.handleReviewRemove(req, res, db);
});
app.get("/api/profile/:email", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.get("/api/review/:id", (req, res) => {
  reviewList.handleReviewGet(req, res, db);
});
app.get("/api/review/:id/user/:email", (req, res) => {
  myReview.handleMyReview(req, res, db);
});
app.get("/api/tests/:id", (req, res) => {
  getTest.handleTestFetch(req, res, db);
});
app.get("/api/tests", (req, res) => {
  getTests.handleTestsFetch(req, res, db);
});
app.get("/api/cats/:cat", (req, res) => {
  getReviewsByCat.handleFetchByCat(req, res, db);
});
app.get("/api/cats", (req, res) => {
  getCats.handleCatsFetch(req, res, db);
});

app.post("/api/scrape", function (req, res) {
    // console.log("scraping", req.body.url);
    console.log("scraping");
    // let url = "https://www.parinc.com/Products/ACHIEVEMENT-DEVELOPMENT";
    let url = req.body.url
    // let url = 'https://www.proedinc.com/'
    let cat = req.body.cat
    async function scrapePage(url) {
      process.setMaxListeners(Infinity);
      console.log("here at", url);
      const browser = await puppeteer.launch();
      let page = await browser.newPage();
      await page.goto(url);
      await page.screenshot({ path: "1.png" });
    //   await page.waitForSelector("div.treenav-menu", {
    //     visible: true,
    //   });
    //   await page.select('#telCountryInput', 'my-value')
var lastPageNumber = 3
// const results = []
await page.waitForSelector("select#ctl00_MPContentAll_MPContent_vProductList_ddlPageSize", {
  visible: true,
});
await page.select('select#ctl00_MPContentAll_MPContent_vProductList_ddlPageSize', '50')
await page.waitForSelector(".list-item-title a", {
  visible: true,
});

    for (let index = 0; index < lastPageNumber; index++) {
      console.log("lets go")
      await page.screenshot({ path: `${index}.png` });
      // await page.waitForSelector("input#ctl00_MPContentAll_MPContent_vProductList_ctrPaging1_imgNext", {
      //   visible: true,
      // });
      await page.waitForSelector(".list-item-title a", {
        visible: true,
      });
    
      let data = await page.evaluate(() => {
        const elements = document.querySelectorAll(".list-item-title a");
        const urls = Array.from(elements).map((v) => v.href);
        return urls;
      });
      // console.log(results, "data", index)
      console.log("time to click")
      scrapeSinglePage(data, cat);
      // if ($('#ctl00_MPContentAll_MPContent_vProductList_ctrPaging1_imgNext').length) {
        await page.click('#ctl00_MPContentAll_MPContent_vProductList_ctrPaging1_imgNext');
      // }
    }      
  
      // const data = await page.evaluate(() => {
      //   const elements = document.querySelectorAll(".list-item-title a");
      //   const urls = Array.from(elements).map((v) => v.href);
      //   return urls;
      // });
   
      // console.log(data, "data")
    }
    scrapePage(url);
    // scrapeSinglePage()
  
    async function scrapeSinglePage(data, cat) {
        console.log('single page')
      // let link = 'https://www.parinc.com/Products/Pkey/516';
      // const selector = "#dnn_ctr1373_ProductDisplay_lblPurpose";
      data.forEach( (link) => {
        axios.get(link).then(function (response) {
          var $ = cheerio.load(response.data);
            let title = $('#product-title').text()
            let author =$('#product-byline').text()
            let category = cat;
            // let comp_time = ''
            // let admin = ''
            // ------------- just adding everything in these 3 columns -------
            var age_range = $(`#product-content-description strong:contains("Ages") + em`).text()
            if (!age_range.length > 0) {
              var age_range = $(`#product-content-description p:contains("Ages")`).text()
              // var description = $('#product-content-description p:nth-of-type(2)').text()
              // age_range = age_range.split(':')
            }
            var comp_time = $(`#product-content-description strong:contains("Testing Time") + em`).text()
            if (!comp_time.length > 0) {
              var comp_time = $(`#product-content-description p:contains("Testing Time")`).text()
              // var description = $('#product-content-description p:nth-of-type(2)').text()
              // age_range = age_range.split(':')
            }
            var admin = $(`#product-content-description strong:contains("Administration") + em`).text()
            if (!admin.length > 0) {
              var admin = $(`#product-content-description p:contains("Administration")`).text()
              // var description = $('#product-content-description p:nth-of-type(2)').text()
              // age_range = age_range.split(':')
            }

               // ------------- end of section -------


            var description = $('#product-content-description p:nth-of-type(3)').text()
            if (description.length < 100) {
              var description = $('#product-content-description p:nth-of-type(2)').text()

              if (description.length < 100) {
                var description = ''
              }
            }
            let qual_level = $(`#product-fields label:contains("Test Level") + span`).text()
            // console.log(description.length)
            //   var age_range = $(`#product-content-description strong:contains("Ages") + em`).contents().filter( function() {
            //     return this.nodeType==3;
            //   }).text().trim();
            // }
           
            console.log(title)
            //   let description = $('#details > p').text()
            //   let category = cat
            //   let author = $('#dnn_ctr1373_ProductDisplay_lblProductAuthors').text()
            //   let age_range = $('#dnn_ctr1373_ProductDisplay_lblAgeRange').text()
            //   let comp_time = $('#dnn_ctr1373_ProductDisplay_lblHAdminTime').text()
            //  let qual_level =$('.qualLevel').text() 
            //  let admin = $('#dnn_ctr1373_ProductDisplay_lblFormat').text()  
  
          //         var $ = cheerio.load(response.data);
          
          //     let title = $('.program-details__name').text()
  
          db('pro_tests')
                  .insert([
                    {
                    title,
                    author,
                    category,
                    description,
                    age_range,
                    qual_level,
                    comp_time,
                    admin,
                    // forms,
                    // scores_interpretation,
                    link
                  }
                     ])
                  // .then(res.send("POST request to the homepage"))
                  .catch(err => console.log("err: ", err))
                    })
                    })
                  }
                })




if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
