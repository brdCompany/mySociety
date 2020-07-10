const express = require('express');
const User =  require('../models/user');
const Owner =  require('../models/owner');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

const cors = require("cors");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

router.post('/signup', (req, res, next) => {
  console.log("I am in signup:"+ req.body.email);
  console.log(req.body.password);
  bcrypt.hash(req.body.password, 10)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    user.save().then(result => {
      res.status(201).json({
        message: 'User created',
        result: result
      });
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });
});

router.post('/login', (req, res, next) => {
  let fetchedUser;
  console.log(req.body.email);
  User.findOne({email: req.body.email}).then( user => {
    if(!user) {
      return res.status(401).json({
        message: 'User Authentication failed'
      });
    }
    fetchedUser = user;

    return bcrypt.compare(req.body.password, user.password);
  })
  .then(result => {
    if(!result){
      return res.status(401).json({
        message: 'User Authentication failed'
      });
    }
    const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id},
                            'secret_this_should_be_longer', {expiresIn: '1h'});
    res.status(200).json({
      token: token,
      expiresIn: 3600
    });
  }).catch(err => {
    return res.status(401).json({
      message: 'Auth failed'
    });
  });
});


//Owners related operations

router.post('/addOwner', checkAuth, (req, res, next) => {
      console.log(req.body.name);
    const owner = new Owner({
      name: req.body.name,
      coownername: req.body.coownername,
      societyname: req.body.societyname,
      block: req.body.block,
      flatno: req.body.flatno,
      primarymobile: req.body.primarymobile,
      secondarymobile: req.body.secondarymobile,
      primaryemail: req.body.primaryemail,
      isresident: req.body.isresident
    });
    owner.save().then(result => {
      res.status(201).json({
        message: 'Owner added',
        result: result
      });
      console.log(result);
    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });

  router.put('/:id', checkAuth, (req, res, next) => {

    const owner = new Owner({
      _id: req.params.id,
      name: req.body.name,
      coownername: req.body.coownername,
      societyname: req.body.societyname,
      block: req.body.block,
      flatno: req.body.flatno,
      primarymobile: req.body.primarymobile,
      secondarymobile: req.body.secondarymobile,
      primaryemail: req.body.primaryemail,
      isresident: req.body.isresident
    });
    console.log(owner);
    Owner.updateOne({_id:req.params.id}, owner).then(
      result => {
        console.log(result);
        res.status(200).json({message: 'Owner details Updated successful!.'});
      });
  });

  router.get('', checkAuth, (req, res, next) => {
    Owner.find()
    .then(documents => {
      res.status(200).json({
        message: 'Post fetched successfully',
        owners: documents
      });
    });
  });

  router.get('/:id', checkAuth, (req, res, next) => {
    Owner.findById(req.params.id).then(owner => {
      if (owner) {
        res.status(200).json(owner);
      } else {
        res.status(404).json({ message: "Owner not found!" });
      }
    });
  });

  router.delete('/:id', checkAuth, (req, res, next) => {
    Owner.deleteOne({_id: req.params.id}).then(result => {
      console.log(result);
      res.status(200).json({message: 'Owner deleted from DB!'});
    });
  });

  // define a sendmail endpoint, which will send emails and response with the corresponding status
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";


  router.post("/sendmail", checkAuth, (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, (err, info) => {
    if (err) {
      console.log(err);
      res.status(400);
      res.send({ error: "Failed to send email" });
    } else {
      console.log("Email has been sent");
      res.send(info);
    }
  });
});

const sendMail = (user, callback) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
    user: "bulbul.alamgir@gmail.com",
    pass: "BBBBBB"
  }
  });

  const mailOptions = {
    from: 'dsobnam@gmail.com',
    to: 'bulbul.alamgir@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  transporter.sendMail(mailOptions, callback);


}


module.exports = router;
