const express = require('express');
const router = express.Router();
const Station = require('../models/station');
const User = require('../models/user');
const nextrain = require('../modules/nextrain');
const { MTA_KEY } = require('../modules/config');

router.get('/find/:searchText', async (req, res) => {
  try {
    if(!req.params.searchText) {
      res.status(400).json({ msg: 'Invalid Request.' });
    } else {
     res.status(200).json({ msg:'Success', records: await Station.search(req.params.searchText) });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Error.', err: err });
  }
});

router.post('/delete', async(req, res) => {
  try {
    let user = await req.user.populate('stations');
    let station = user.stations.find(d => d._id == req.body._id);
    user.stations.pull(station);
    await user.save();
    let nts = await nextrain(user.stations)
    res.status(200).json({ msg:'Success', nextrains: nts });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});

router.post('/add', async(req, res) => {
  try {
    let user = await req.user.populate('stations');
    
    if(!user.stations.some(s => s._id == req.body.stationID)) {
      
      let station = await Station.findById(req.body.stationID);
      user.stations.push(station);
      await user.save();
      let nts = await nextrain(user.stations)
      res.status(200).json({ msg:'Success', nextrains: nts });
    } else {
      res.status(202).json({ msg:'Already exists', station: null });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});


module.exports = router;