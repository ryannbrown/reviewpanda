const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
var Client = require("ftp");
var fs = require("fs");
const knex = require("knex");

const app = express();
const port = process.env.PORT || 5000;

// const nodemailer = require("nodemailer");
const morgan = require("morgan");
const router = require("express").Router();
const path = require("path");
const bcrypt = require("bcrypt-nodejs");

const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const review = require("./controllers/review");
const reviewList = require("./controllers/getReviews");
const myReview = require("./controllers/getMyReview");
const removeReview = require("./controllers/removeReview.js");
const getTests = require("./controllers/getTests.js");
const getTest = require("./controllers/getTest.js");
var axios = require("axios");
var cheerio = require("cheerio");
// aws bucket
// const AWS = require('aws-sdk');
require("dotenv").config();
// const Busboy = require('busboy');
// const busboy = require('connect-busboy');
// const busboyBodyParser = require('busboy-body-parser')
const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
// app.use(busboy())
// app.use(busboyBodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var pg = require("pg");

const db = knex({
  client: "pg",
  connection: process.env.CONNSTRING,
  searchPath: ["knex", "public"],
});


// const db = knex({
//   client: "pg",
//   connection: {
//     host: '127.0.0.1',
//     user: 'postgres',
//     password: 'Pass1234',
//     database: 'postgres'
//   },
//   searchPath: ["knex", "public"],
// });

app.post("/api/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.post("/api/signin", signin.handleSignin(db, bcrypt));
app.post("/api/postreview", (req, res) => {
  review.handleReviewPost(req, res, db);
});
app.delete("/api/remove_review", (req, res) => {
  removeReview.handleReviewRemove(req, res, db);
});
app.get("/api/profile/:email", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.get("/api/review/:id", (req, res) => {
  reviewList.handleReviewGet(req, res, db);
});
app.get("/api/review/:id/user/:email", (req, res) => {
  myReview.handleMyReview(req, res, db);
});
app.get("/api/tests", (req, res) => {
  getTests.handleTestsFetch(req, res, db);
});
app.get("/api/tests/:id", (req, res) => {
  getTest.handleTestFetch(req, res, db);
});




app.post("/api/scrape", function (req, res) {
  console.log("scraping", req.body.url);
  let url = req.body.url;
  axios.get('https://www.pearsonassessments.com/professional-assessments/products/products-by-acronym.html').then(function (response) {
    
    var $ = cheerio.load(response.data);
    // console.log($)
    // let reviewData = {
    //    title : $('.program-details__name').text(),
    //    description : $('.program-details__def').first().text(),
    //    ageRange : $(`dt.program-details__term.term\\=AGE_RANGE`).next('dd').children().text().trim(),
    //    qualLevel : $(`.quals-badge`).text().trim(),
    //    compTime : $(`dt.program-details__term.term\\=COMPLETION_TIME`).next('dd').children().text().trim(),
    //     admin : $(`dt.program-details__term.term\\=ADMINISTRATION`).next('dd').children().text().trim(),
    //     forms : $(`dt.program-details__term.term\\=FORMS`).next('dd').children().text().trim(),
    //     scoresInterpretation : $(`dt.program-details__term.term\\=SCORES_INTERPRETATION`).next('dd').children().text().trim(),
    // }
    // console.log(reviewData);
  

    $(".content-tile-text a").each(function(i, value) {
      let link = $(value).attr('href')
      let searchUrl = 'https://www.pearsonassessments.com' + link
      console.log(searchUrl)
      axios.get(searchUrl).then(function (response) {


        var $ = cheerio.load(response.data);


    let title = $('.program-details__name').text()
    let description = $('.program-details__def').first().text()
    let age_range = $(`dt.program-details__term.term\\=AGE_RANGE`).next('dd').text().trim()
    let qual_level = $(`.quals-badge`).text().trim()
    let comp_time = $(`dt.program-details__term.term\\=COMPLETION_TIME`).next('dd').text().trim()
    // let comp_time = $(`dt.program-details__term.term\\=COMPLETION_TIME`).next('dd').children().text().trim()
    let admin = $(`dt.program-details__term.term\\=ADMINISTRATION`).next('dd').text().trim()
    let forms = $(`dt.program-details__term.term\\=FORMS`).next('dd').text().trim()
    let scores_interpretation = $(`dt.program-details__term.term\\=SCORES_INTERPRETATION`).next('dd').children().text().trim()

    // console.log(title, comp_time)
//  console.log(title)

      db('pearson_tests')
        .insert([
          {
          title,
          description,
          age_range,
          qual_level,
          comp_time,
          admin,
          forms,
          scores_interpretation,
          link
        }
           ])
        // .then(res.send("POST request to the homepage"))
        .catch(err => console.log("err: ", err))
          })
          })
          
        })
        })

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));

  // Handle React routing, return all requests to React app
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`))