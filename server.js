
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
const saveTest = require("./controllers/savetest.js");
const removeTest = require("./controllers/removeSavedTest.js");
const updateReview = require("./controllers/updateReview");
const reviewList = require("./controllers/getReviews");
const myReview = require("./controllers/getMyReview");
const allMyReviews = require("./controllers/getAllMyReviews.js");
const usersReviews = require("./controllers/getUsersReviews.js");
const removeReview = require("./controllers/removeReview.js");
const getTests = require("./controllers/getTests.js");
const getTest = require("./controllers/getTest.js");
const getCats = require("./controllers/getCats.js");
const getReviewsByCat = require("./controllers/getReviewsByCat.js");
const recentReviews = require("./controllers/getRecentReviews.js");
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
 const db = knex({
   client: "pg",
   connection: process.env.CONNSTRING,
   searchPath: ["knex", "public"],
 });


// local
// const db = knex({
//   client: "pg",
//   connection: {
//     host: '127.0.0.1',
//     user: 'postgres',
//     password: 'Pass1234',
//     database: 'postgres'
//   },
//   searchPath: ["knex", "public"],
// });

app.post("/api/register", (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});
app.post("/api/signin", signin.handleSignin(db, bcrypt));
app.post("/api/postreview", (req, res) => {
  review.handleReviewPost(req, res, db);
});
app.post("/api/savetest", (req, res) => {
  saveTest.handleSaveTest(req, res, db);
});
app.post("/api/removetest", (req, res) => {
removeTest.handleRemoveSavedTest(req, res, db);
});
app.post("/api/updatereview", (req, res) => {
  updateReview.handleUpdateReviewPost(req, res, db, knex);
});
app.delete("/api/remove_review", (req, res) => {
  removeReview.handleReviewRemove(req, res, db);
});
app.get("/api/profile/:email", (req, res) => {
  profile.handleProfileGet(req, res, db);
});
app.get("/api/review/:test_uuid", (req, res) => {
  reviewList.handleReviewGet(req, res, db);
});
app.get("/api/recentreviews", (req, res) => {
  recentReviews.handleRecentReviewGet(req, res, db);
});
app.get("/api/review/:test_uuid/user/:email", (req, res) => {
  myReview.handleMyReview(req, res, db);
});
app.get("/api/my_reviews/:email", (req, res) => {
  allMyReviews.handleGetMyReviews(req, res, db);
});
app.get("/api/users_reviews/:uuid", (req, res) => {
  usersReviews.handleGetUsersReviews(req, res, db);
});
app.get("/api/tests/:uuid", (req, res) => {
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
