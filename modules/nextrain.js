const https = require('https');
const protobuf = require('protobufjs');
const fs = require('fs');
const { MTA_KEY } = require('../modules/config');

async function nextrain(stations) {
  
  let endpoints = stations.reduce((eps, s) => {
    s.routes.forEach(r => {
      if(!eps.includes(r.endpoint)) {
        eps.push(r.endpoint)
      }
    });
    return eps;
  },[]); 


  let trainData = [];
  for (let i = 0; i < endpoints.length; i++) {
    let f = await getData(endpoints[i]);
    trainData = trainData.concat(f);
  }
 
  let stationUpdates = []
  stations.forEach(s => {
    
    let tt = `${s.gtfsCode}N`;
    let tts = `${s.gtfsCode}S`;
    
    let uptownTimes = trainData.filter(e => e.tripUpdate && e.tripUpdate.stopTimeUpdate.some(s => s.stopId ==  tt )).map(e => {
      let stopDate = new Date(e.tripUpdate.stopTimeUpdate.filter(s => s.stopId == tt)[0].arrival.time.low * 1000);
      let r = s.routes.find((r) => r.route == e.tripUpdate.trip.routeId);
        return {route: r, stopDate: stopDate};
    }).sort((a,b) => a.stopDate - b.stopDate).slice(0, 4);

    let downtownTimes = trainData.filter(e => e.tripUpdate && e.tripUpdate.stopTimeUpdate.some(s => s.stopId == tts)).map(e => {
      let stopDate = new Date(e.tripUpdate.stopTimeUpdate.filter(s => s.stopId == tts)[0].arrival.time.low * 1000);
      return {
        route: s.routes.find((r) => r.route == e.tripUpdate.trip.routeId),
        stopDate: stopDate,
      }
    }).sort((a,b) => a.stopDate - b.stopDate).slice(0, 4);
    
    stationUpdates.push({station: s, uptownTimes: uptownTimes, downtownTimes: downtownTimes});
  }); 



  function getData(endpoint) {
    return new Promise(resolveIt => {
      let chunks = [];
      let root = protobuf.loadSync('./metadata/gtfs-realtime.proto');
      let feedMessage = root.lookupType('transit_realtime.FeedMessage');
      https.get(endpoint, { 
      headers: { "x-api-key": MTA_KEY} },
      (resp) => {
        resp.on('data', (chunk) => {
          chunks.push(chunk)
        });
        resp.on('end', () => {
          let data = Buffer.concat(chunks);
          let entities = feedMessage.decode(data).entity;
          resolveIt(entities.filter(e => e.tripUpdate && e.tripUpdate.stopTimeUpdate));
        });
      });
    
    });
  }
  
  return stationUpdates;
   
}

module.exports = nextrain;