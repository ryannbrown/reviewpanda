
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
  // let url = req.body.url;
  // let index = 6;
  for (var i = 1; i < 6; i++) {
      let url = `https://www.wpspublish.com/profession-speech-language-pathology-slp?pagenumber=${i}`
      // let url = `https://www.wpspublish.com/profession-school-child-clinical-psychology?pagenumber=${i}`
      // let url = `https://www.wpspublish.com/profession-occupational-therapy-ot?pagenumber=${i}`
      // let url = `https://www.wpspublish.com/profession-neuropsychology?pagenumber=${i}`
      // let url = `https://www.wpspublish.com/profession-adult-clinical-psychology?pagenumber=${i}`
      // let category = 'Adult Clinical Psychology'
      let category = 'Speech-Language Pathology (SLP)'
      // let category = 'Occupational Therapy'
      // let category = 'Adult Clinical Psychology'
      // let category = 'Adult Clinical Psychology'
  axios.get(url).then(function (response) {
//         console.log("RUN ---------------------", i)
// console.log("search url", url)

    var $ = cheerio.load(response.data);
  
// let types = []
      // console.log(category)
      $(".product-item__link").each(function(i, value) {
      // let category = $(this).parents('.collection-details').siblings().text().trim();
      let link = $(value).attr('href')
      let searchUrl = `https://www.wpspublish.com${link}`
  //    console.log(searchUrl, i)

      getDetails = (searchUrl) => {
        axios.get(searchUrl).then(function (response) {
          // console.log(searchUrl)
          var $ = cheerio.load(response.data);
      // let titleCode = $('.header-info > h1').text()
    //  console.log(category)

      let title = $('.product-card__info h1').text().trim();
      let abbrev =title.match(/\(([^)]+)\)/)[1];
      let author = $('.product-card__author span').text().trim();
      var description = $('.about__content .cbody').first().text().trim();
      if (!description.length) {
          var description = $('.about__content .body').first().text().trim();
          if (!description.length) {
              var description = $('.about__content h2 + p').first().text().trim(); 
          }
      }
      let benefits = $(`td.product-card__table-item-title:contains("Benefits") + td`).text().trim()
      let age_range = $(`td.product-card__table-item-title:contains("Ages") + td`).text().trim()
      let comp_time = $(`td.product-card__table-item-title:contains("Admin time") + td`).text().trim()
      let format = $(`td.product-card__table-item-title:contains("Format") + td`).text().trim()
      let scores = $(`td.product-card__table-item-title:contains("Scores") + td`).text().trim()
      let norms = $(`td.product-card__table-item-title:contains("Norms") + td`).text().trim()
      let publish_date = $(`td.product-card__table-item-title:contains("Publish Date") + td`).text().trim()
      let qual_level = $(`td.product-card__table-item-title:contains("Qualifications") + td`).contents().filter( function() {
          return this.nodeType==3;
      }).text().trim();
      let link = searchUrl;
console.log(category, abbrev)

     db('wps_tests')
          .insert([
            {
            title,
            category,
            abbrev,
            benefits,
            author,
            format,
            scores,
            norms,
            publish_date,
         description,
            age_range,
            qual_level,
            comp_time,
          //   admin,
            // forms,
            // scores_interpretation,
            link
          }
             ])
          // .then(res.send("POST request to the homepage"))
          .catch(err => console.log("err: ", err))


     
      // console.log(qual_level)

 
            })

          }
          getDetails(searchUrl, category)
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
