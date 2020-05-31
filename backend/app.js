const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
//const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');
const path = require('path');

const app = express();

//const uri = 'mongodb+srv://ba_mongo_db:VOdrgcur6TlUWWii@cluster0-vlgyj.mongodb.net/angular-node';
const uri = 'mongodb+srv://db_mysociety:tLXxNLXAV3615985@cluster0-vlgyj.mongodb.net/angular-node';
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to database');
  })
  .catch( () =>{
    console.log('Connection failed');
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  console.log('My first middleware');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, OPTIONS, DELETE");
  // if(req.method === 'OPTIONS') {
  //   return res.status(200).json({});
  // }
  next();
});

//app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);
module.exports = app;
