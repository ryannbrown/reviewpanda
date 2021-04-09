
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
const addImg = require("./controllers/addImg.js");
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
const topContribs = require("./controllers/getTopContribs.js");
const popTests = require("./controllers/getPopTests.js");
var axios = require("axios");
var cheerio = require("cheerio");
var puppeteer = require("puppeteer");
// aws bucket
 const AWS = require('aws-sdk');
require("dotenv").config();
 const Busboy = require('busboy');
 const busboy = require('connect-busboy');
 const busboyBodyParser = require('busboy-body-parser')
const cors = require("cors");
app.use(cors());
app.use(morgan("dev"));
 app.use(busboy())
 app.use(busboyBodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var pg = require("pg");
const { response } = require("express");

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
app.post("/api/addimg", (req, res) => {
  addImg.handleAddImg(req, res, db, knex);
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
app.get("/api/topcontribs", (req, res) => {
  topContribs.handleTopContribGet(req, res, db);
});
app.get("/api/poptests", (req, res) => {
popTests.handlePopTestsGet(req, res, db);
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

app.post("/api/hello", (req, res) => {
console.log(req.body.code)
})

app.post("/api/linkedin", (req, res) => {
  console.log('here we go!')

  
let clientId = process.env.CLIENT_ID
let clientSecret = process.env.CLIENT_SECRET
let redirect = process.env.LI_REDIRECT
let uriEncode = process.env.LI_URLENCODE


  // console.log(req.body)

  // const options = {
  //   headers: {
  //       'Content-Type': 'application/json',
  //   }
  // };

  let userInfo = []
  let totalCount = 0;

  let code = req.body.code;
 console.log(code)


  axios.post(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${uriEncode}&client_id=${clientId}&client_secret=${clientSecret}`, {
    
    // grant_type: 'authorization_cod',
    // code: code,
    // redirect_uri: 'http%3A%2F%2Flocalhost%3A3000%2F',
    // client_id: '77vmr4j9fldtav',
    // client_secret: 'jmD6TSEIzjWWr8TE'
  })
  .then((response) => {

 
    // handle success
    console.log("our response", response.data.access_token);
    getBasicInfo(response.data.access_token)
  }).catch(function (error) {
    console.log(error);
  });

  const getBasicInfo = (token) => {
    console.log("lets run this code", token)

    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  
  // const bodyParameters = {
  //    key: "value"
  // };

  axios.get( 
    'https://api.linkedin.com/v2/me',
    config
  ).then((response) => {
    // handle success
    console.log("basic info", response.data);
    getUserImage(token)
    userInfo.push(response.data)
    totalCount++;
    if (totalCount === 3) {
      console.log("all user info", userInfo)
      res.send(JSON.stringify({userInfo}))
    }
    // getBasicInfo(response.data.access_token)
   
  }).catch(function (error) {
    console.log(error);
  });


  }
  const getUserImage = (token) => {
    console.log("lets run this code", token)

    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  
  // const bodyParameters = {
  //    key: "value"
  // };

  axios.get( 
    'https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~:playableStreams))',
    config
  ).then((response) => {
    // handle success
    console.log("user image", response.data);
    getUserEmail(token)
    userInfo.push(response.data)
    totalCount++
    if (totalCount === 3) {
      console.log("all user info", userInfo)
      res.send(JSON.stringify({userInfo}))
    }
    // getBasicInfo(response.data.access_token)
    
  }).catch(function (error) {
    console.log(error);
  });


  }
  const getUserEmail = (token) => {
    console.log("lets run this code", token)

    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
  
  // const bodyParameters = {
  //    key: "value"
  // };

  axios.get( 
    'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
    config
  ).then((response) => {
    // handle success
    console.log("user email address", response.data.elements[0]["handle~"]);
    userInfo.push(response.data)
    totalCount++

    if (totalCount === 3) {
      console.log("all user info", userInfo)
      res.send(JSON.stringify({userInfo}))
    }
    // getUserEmail(token)
    // getBasicInfo(response.data.access_token)
    
  }).catch(function (error) {
    console.log(error);
  });

  // registerThroughLinkedIn(userInfo);

// const registerThroughLinkedIn (userInfo) => {
//   const { email, first_name, last_name, password, subscribed, prof_title, license } = req.body;



//   // let title = prof_title
//   // let license_number = license
//   let defaultImg = 'https://www.clipartkey.com/mpngs/m/152-1520367_user-profile-default-image-png-clipart-png-download.png'
//   if (!userInfo) {
//     return res.status(400).json('Trouble with Linked in');
//   }
//   const hash = bcrypt.hashSync(password);
//     db.transaction(trx => {
//       trx.insert({
//         password: hash,
//         email: email
//       })
//       .into('user_logins')
//       .returning('email')
//       .then(loginEmail => {
//         return trx('user_profiles')
//           .returning('*')
//           .insert({
//             email: loginEmail[0],
//             first_name: first_name,
//             last_name: last_name,
//             subscribed: subscribed,
//             title,
//             avatar: defaultImg,
//             uuid: uuid(),
//             license_number,
//             joined: new Date()
//           })
//           .then(user => {
//             res.json(user[0]);
//           })
//       })
//       .then(trx.commit)
//       .catch(trx.rollback)
//     })
//     .catch(err => res.status(400).json('unable to register'))
//     // .catch(err => console.log(err))
// }
}



})








const BUCKET_NAME = process.env.NAME;
const ACCESS = process.env.ACCESS
const SECRET = process.env.SECRET

// TODO: be able to remove pictures from S3 programmatically? 
function uploadToS3(file) {
    console.log("file", file)
  let s3bucket = new AWS.S3({
    accessKeyId: ACCESS,
    secretAccessKey: SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: file.name,
      Body: file.data
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        // console.log('error in callback');
        // console.log(err);
      }
      // console.log('success');
      // console.log(data);
    });
  });
}

app.post('/api/upload', function (req, res, next) {

    console.log(req.body)

  // console.log("body", req.body)
  // console.log("req", req)
  const element1 = req.body.element1;
  // console.log(element1)
  var busboy = new Busboy({ headers: req.headers });

  // The file upload has completed
  busboy.on('finish', function () {
    console.log("files", req.files)
    // console.log('Upload finished');
    const file = req.files.element1;
    // console.log(file);

    uploadToS3(file);
  });

  req.pipe(busboy);
});




// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });


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
