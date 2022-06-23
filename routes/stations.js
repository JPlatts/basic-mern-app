const express = require('express');
const router = express.Router();
const Station = require('../models/station');

router.get('/find/:searchText', async (req, res) => {
  try {
    if(!req.params.searchText) {
      res.status(400).json({ msg: 'Invalid Request.' });
    } else {
      console.log(req.params.searchText);
     res.status(200).json({ msg:'Success', records: await Station.search(req.params.searchText) });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Error.', err: err });
  }
});


module.exports = router;