

    const express = require('express');
    const helmet = require("helmet");
    const bodyParser = require('body-parser');
    var Client = require('ftp');
    var fs = require('fs');
    const knex = require('knex');
    
    const app = express();
    const port = process.env.PORT || 5000;
    
    // const nodemailer = require("nodemailer");
    const morgan = require('morgan');
    const router = require("express").Router();
    const path = require("path");
    const bcrypt = require('bcrypt-nodejs');

    const register = require('./controllers/register');
    const signin = require('./controllers/signin');
    const profile = require('./controllers/profile');
    const review = require('./controllers/review');
    const reviewList = require('./controllers/getReviews');
    const myReview = require('./controllers/getMyReview');
    const removeReview = require('./controllers/removeReview.js');
    // aws bucket
    // const AWS = require('aws-sdk');
    require('dotenv').config();
    // const Busboy = require('busboy');
    // const busboy = require('connect-busboy');
    // const busboyBodyParser = require('busboy-body-parser')
    const cors = require('cors')
    app.use(cors());
    app.use(morgan('dev'));
    // app.use(busboy())
    // app.use(busboyBodyParser())
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));


    var pg = require('pg');
    
    const db = knex({
      client: "pg",
      connection: process.env.CONNSTRING,
      searchPath: ["knex", "public"],
    });

    app.post('/api/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
    app.post('/api/signin', signin.handleSignin(db, bcrypt))
    app.post('/api/postreview', (req, res) => { review.handleReviewPost(req, res, db)})
    app.delete('/api/remove_review', (req, res) => { removeReview.handleReviewRemove(req, res, db)})
    app.get('/api/profile/:email', (req, res) => { profile.handleProfileGet(req, res, db)})
    app.get('/api/review/:id', (req, res) => { reviewList.handleReviewGet(req, res, db)})
    app.get('/api/review/:id/user/:email', (req, res) => { myReview.handleMyReview(req, res, db)})
    
    
    
      if (process.env.NODE_ENV === 'production') {

        app.use(helmet({
          contentSecurityPolicy: false,
        }));
        // Serve any static files
        app.use(express.static(path.join(__dirname, 'client/build')));
    
        // Handle React routing, return all requests to React app
        app.get('*', function (req, res) {
          res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
        });
      }
    
    
      app.listen(port, () => console.log(`Listening on port ${port}`));
    // console.log('Application running!' + cluster.worker.id);
    // }