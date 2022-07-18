const express = require('express');
const router = express.Router();
const https = require('https');
const protobuf = require('protobufjs');
const nextrain = require('../modules/nextrain');
const fs = require('fs');
const { MTA_KEY } = require('../modules/config');




router.get('/', async (req, res) => {
  try {
    let u = await req.user.populate('stations');
    let nts = await nextrain(u.stations);
    res.status(200).json({ msg:'Success', nextrains: nts  });
  
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;