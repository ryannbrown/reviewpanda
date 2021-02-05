
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

// production
// const db = knex({
//   client: "pg",
//   connection: process.env.CONNSTRING,
//   searchPath: ["knex", "public"],
// });


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

app.post("/api/scrape", function (req, res) {
  // console.log("scraping", req.body.url);
  console.log("scraping");
  let url = "https://www.riversideinsights.com/solutions";
  // let url = req.body.url
  // let cat = req.body.cat
  async function scrapePage(url) {
    process.setMaxListeners(Infinity);
    console.log("here1");
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: "1.png" });
    await page.waitForSelector(".solutionCard", {
      visible: true,
    });
    await page.screenshot({ path: "2.png" });
    let data = await page.evaluate(() => {
      const elements = document.querySelectorAll("div.solutionCard a");
      const urls = Array.from(elements).map((v) => v.href);
      return urls;
    });
    scrapeSinglePage(data);
//      console.log(data, "data")
  }
  scrapePage(url);
  // scrapeSinglePage()

  async function scrapeSinglePage(data) {
    // let link = 'https://www.parinc.com/Products/Pkey/516';
    // const selector = "#dnn_ctr1373_ProductDisplay_lblPurpose";
    for (const link of data) {
        console.log("going to", link)
    process.setMaxListeners(Infinity);
    console.log("inside");
    const browser = await puppeteer.launch();
    let page = await browser.newPage();
    await page.goto(link);
    // await page.screenshot({ path: "3.png" });
    try {
    await page.waitForSelector(".banner-three-fourth", {
      visible: true,
    })
   } catch (error) {
      console.log("no selector present for", link)
    }

    let data = await page.evaluate(() => {
let title = document.querySelector(".banner-three-fourth h1").innerText;
     let description = document.querySelector(".custom-text-section p").innerText
//       const qual_level = documnet.querySelector('.halfWidth p b:contains("Restriction Level") + ul li a').innerText;

      return {
        title, description
      }
    })
console.log(data);
    // await page.screenshot({ path: "5.png" });
    // let singleData = await page.evaluate(() => {
    //   const titleEl = document.querySelectorAll(".banner-three-fourth h1");
    //   const titles = Array.from(titleEl).map((v) => v.textContent);
    //   const descriptionEl = document.querySelector(".custom-text-section p");
    //   const description = Array.from(descriptionEl).map((v) => v.textContent);
    //   return titles, description;
    // });
    // console.log(singleData)
    // scrapeSinglePage(data);
        //     let description = $('#details > p').text()
        //     let category = cat
        //     let author = $('#dnn_ctr1373_ProductDisplay_lblProductAuthors').text()
        //     let age_range = $('#dnn_ctr1373_ProductDisplay_lblAgeRange').text()
        //     let comp_time = $('#dnn_ctr1373_ProductDisplay_lblHAdminTime').text()
        //    let qual_level =$('.qualLevel').text() 
        //    let admin = $('#dnn_ctr1373_ProductDisplay_lblFormat').text()  

        // //         var $ = cheerio.load(response.data);
        
        // //     let title = $('.program-details__name').text()

        // db('par_tests')
        //         .insert([
        //           {
        //           title,
        //           author,
        //           category,
        //           description,
        //           age_range,
        //           qual_level,
        //           comp_time,
        //           admin,
        //           // forms,
        //           // scores_interpretation,
        //           link
        //         }
        //            ])
        //         // .then(res.send("POST request to the homepage"))
        //         .catch(err => console.log("err: ", err))
                
                  }
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
