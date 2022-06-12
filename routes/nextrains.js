const express = require('express');
const router = express.Router();
const https = require('https');
const protobuf = require('protobufjs');
const fs = require('fs');
//const dt = require('date-and-time');
const { MTA_KEY } = require('../modules/config');



router.get('/', async (req, res) => {
  try {
    //let user = await req.user.populate('deciders');
    
    let user = req.user;
       
    let chunks = [];
    let root = protobuf.loadSync('./metadata/gtfs-realtime.proto');
    let feedMessage = root.lookupType('transit_realtime.FeedMessage');
    
    https.get("https://api-endpoint.mta.info/Dataservice/mtagtfsfeeds/nyct%2Fgtfs-ace", { 
      headers: { "x-api-key": MTA_KEY} },
      (resp) => {
        resp.on('data', (chunk) => {
          chunks.push(chunk)
        });
        resp.on('end', () => {
          let data = Buffer.concat(chunks);
          let entities = feedMessage.decode(data).entity;
          let b = entities.filter(e => e.tripUpdate && e.tripUpdate.stopTimeUpdate.some(s => s.stopId == 'A11S')).map(e => {
            return {
              route: e.tripUpdate.trip.routeId,
              stops: e.tripUpdate.stopTimeUpdate.filter(s => s.stopId == 'A11S').map(s => {
                let d = new Date(s.arrival.time.low * 1000);
                return d.toLocaleString('en');
              })
            }
          });
          
          res.status(200).json({ msg:'Success', records: b  });
        });
      }).on("error", (err) => {
        console.log("Error: " + err.message);
        res.status(400).json({ msg:'Invalid Request' });
      });
    
    
  } catch (err) {
    console.log(err);
    
  }
});

module.exports = router;