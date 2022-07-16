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
  await endpoints.forEach(async ep => {
    let nd = await getData(ep);

    trainData = trainData.concat(nd);
  });

  function getData(ep) {
    let chunks = [];
    let root = protobuf.loadSync('./metadata/gtfs-realtime.proto');
    let feedMessage = root.lookupType('transit_realtime.FeedMessage');
    return new Promise((resolve) => {
      https.get(ep, { 
        headers: { "x-api-key": MTA_KEY} },
        (resp) => {
          resp.on('data', (chunk) => {
            chunks.push(chunk)
          });
          resp.on('end', () => {
            let data = Buffer.concat(chunks);
            let entities = feedMessage.decode(data).entity;
             resolve(entities);
          });
       });
    });
  }

  console.log(trainData);
  return trainData;;

  
    
  
}

module.exports = nextrain;