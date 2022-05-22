const express = require('express');
const Decider = require('../models/decider');
const User = require('../models/user');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {JWT_KEY} = require('../modules/config');


router.get('/', async (req, res) => {
  try {
    let user = await req.user.populate('deciders');
    if(user.deciders.length === 0) {
      let d = new Decider();
      d.name = 'What to do on Saturday?';
      d.items.push({text: 'Sleep'});
      d.items.push({text: 'Learn Node.js'});
      d.items.push({text: 'Make Chili'});
      d.items.push({text: 'Run Laps'});
      await d.save();
      user.deciders.push(d);
      await user.save();
    }
    res.status(200).json({ msg:'Success', deciders: user.deciders });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});

router.post('/add-item', async(req, res) => {
  try {
    let user = await req.user.populate('deciders');
    let decider = user.deciders.find(d => d._id == req.body.deciderID);

    if(!decider.items.some(t => t.text.toLowerCase() == req.body.text.toLowerCase().trim())) {
      decider.items.push({ text: req.body.text.trim() });
      await decider.save();
    }
    
    res.status(200).json({ msg:'Success', decider: decider });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});

router.post('/delete-item', async(req, res) => {
  try {
    let user = await req.user.populate('deciders');
    let decider = user.deciders.find(d => d._id == req.body.deciderID);
    let item = decider.items.find(f => f._id == req.body.itemID)
    decider.items.pull(item);
    await decider.save();
    res.status(200).json({ msg:'Success', decider: decider });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});

router.post('/delete', async(req, res) => {
  try {
    let user = await req.user.populate('deciders');
    let decider = user.deciders.find(d => d._id == req.body.deciderID);
    user.deciders.pull(decider)
    await user.save();
    await Decider.deleteOne({_id: req.body.deciderID})
    res.status(200).json({ msg:'Success', deciders: user.deciders });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});


router.post('/add', async(req, res) => {
  try {
    let user = await req.user.populate('deciders');
    if(!user.deciders.some(t => t.name.toLowerCase() == req.body.name.toLowerCase().trim())) {
      let decider = new Decider();
      decider.name = req.body.name.trim()
      await decider.save();
      user.deciders.push(decider);
      await user.save();
      res.status(200).json({ msg:'Success', decider: decider });
    } else {
      res.status(202).json({ msg:'Already exists', decider: null });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});


router.post('/clear-items', async(req, res) => {
  try {
    let user = await req.user.populate('deciders');
    let decider = user.deciders.find(d => d._id == req.body.deciderID);
    decider.items = [];
    await decider.save();
    res.status(200).json({ msg:'Success', decider: decider });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg:'Invalid Request' });
  }
});

module.exports = router;