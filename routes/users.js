const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    if(req.user && req.user.isAdmin) {
      const users = await User.find().select('-pwdHash -pwdSalt -confirmationSalt -confirmationHash');
      res.status(200).json(users);
    } else {
      throw new Error('Unauthorized');
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'User request failed.', err: err });
  }
});

module.exports = router;