const express = require('express');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../modules/config');
const { restart } = require('nodemon');

router.post('/register', async (req, res) => {
  try {
    if (!User.validateNewUser(req.body)) {
      res.status(400).json({ msg: 'Invalid Request.' });
    } else if(await User.userExistsWithEmail(req.body.email)) {
      res.status(202).json({ msg: 'An account already exists for this email address.' })
    } else {
      let u = await User.createAndSave(req.body);
      if(u) {
        res.status(200).json({ msg:'Success', user: await User.desensitize(u) });
      } else {
        res.status(400).json({ msg: 'User registration failed' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'User registration failed.', err: err });
  }
});

router.get('/isconfirmed/:id', async (req, res) => {
  try {
    if(!req.params.id) {
      res.status(400).json({ msg: 'Invalid Request.' });
    } else {
      if (await User.isConfirmed(req.params.id) === true) {
        res.status(200).json({ isConfirmed: true, isSuccess: true, msg:'Success' });
      } else {
        res.status(200).json({ isConfirmed: false, isSuccess: true, msg:'Success' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Registration Check Failed.', err: err });
  }
});

router.get('/confirm/:id.:key', async (req, res) => {
  try {
    if(!req.params.id) {
      res.status(400).json({ msg: 'Invalid Request.' });
    } else {
      let usr = await User.confirm(req.params.id, req.params.key);
      if (usr) {
        res.status(200).json({ user: usr, isSuccess: true, msg:'Success' });
      } else {
        res.status(400).json({ msg: 'Invalid Request.' });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request.', err: err });
  }
});

router.post('/authenticate', async (req, res) => {
  try {
    let user = await User.authenticate(req.body.email, req.body.password);

    if(user && user.confirmationDate) {
      const accessToken = jwt.sign({ user: user, created: new Date()}, JWT_KEY);
      res.status(200).json({user: user, token: accessToken, msg:'success' });
    } else if(user && !user.confirmationDate) {
      res.status(201).json({user: user, msg:'Account has not been confirmed.'});
    } else {
      res.status(202).json({ msg:'Authentication Failed' });
    }
  } catch (err) {
    res.status(400).json({ msg:'Invalid Request' });
  }
  
});

router.post('/reauthenticate', async (req, res) => {
  try {

    let unpacked = jwt.verify(req.body.token, JWT_KEY);
    let user = await User.findById(unpacked.user._id);
    if(!user) {
      console.log('reauth user not found')
    }
    if(unpacked && unpacked.user && user && unpacked.user.confirmationDate) {
      res.status(200).json({user: unpacked.user, token: req.body.token, msg:'success' });
    } else {
      res.status(202).json({ msg:'Authentication Failed' });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
  
});

router.post('/forgotpw', async (req, res) => {
  try {
    let user = await User.findOne({email:req.body.email});
    if(!user) {
      res.status(202).json({ msg:'Account not found.' });
    } else if(user && user.hasPwResetRequest()) {
      res.status(203).json({msg:'An active password reset request already exists. Please try again later.' });
    } else {
      await User.requestPwReset(user);
      res.status(200).json({msg:'Success.' });
    }
    
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }

  
  
});

router.post('/resetpw', async (req, res) => {
  try {
    let user = await User.findOne({email:req.body.email});
    if(!user) {
      res.status(202).json({ msg:'Account not found.' });
    } else {
      let s = await user.resetPassword(req.body.resetCode, req.body.password);
      if(s) {
        res.status(200).json({msg:'Success.' });
      } else {
        res.status(400).json({ msg:'Invalid Request' });    
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});


module.exports = router;