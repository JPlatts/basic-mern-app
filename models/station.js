const mongoose = require('mongoose');
const fs = require('fs');


const stationSchema = mongoose.Schema({
  gtfsCode: { 
    type: String,
    required: true,
    unique: true
  },
  name: { type: String },
  line: { type: String },
  routes: [{ route:String, endpoint:String, img: { data: Buffer, contentType: String } }],
  northLabel: { type: String },
  southLabel: { type: String },
  latitude:{ type: mongoose.Decimal128},
  longitude:{ type: mongoose.Decimal128},
  borough: { type: String }
});

stationSchema.statics.loadFromMTAFile = async () => {
  let rawStationData = fs.readFileSync('./metadata/stations.json');
  let stationData = JSON.parse(rawStationData);
  
  let rawRouteData = fs.readFileSync('./metadata/routes.json');
  let routeData = JSON.parse(rawRouteData);

  stationData.forEach(async (s) => {
    
    let station = await Station.findOne({ gtfsCode: s.StopID });
    
    if (!station) {
        station = new Station();
    }

    station.gtfsCode = s.StopID;
    station.name = s.StopName;
    station.line = s.Line;
    station.northLabel = s.NorthLabel;
    station.southLabel = s.SouthLabel;
    station.latitude = s.Latitude;
    station.longitude = s.Longitude;
    station.borough = s.Borough;

    station.routes = routeData.filter((r) => {
      return s.Routes.split(" ").some((v) => v === r.route);
    }).map((r) => { 
      return {
        ...r,
        img: {
          data: fs.readFileSync(`./metadata/route-images/${r.route}.svg`),
          contentType: 'image/svg'
        }
      };
    });
    
    station.save()  
  });
  console.log('Subway Stations Loaded..')
  
}

stationSchema.statics.search = async (term) => {
  const regex = new RegExp(term, 'i');
  return await Station.find({ "name": { "$regex": regex } }).limit(7);
  
}
  

const Station = mongoose.model('Station', stationSchema);
module.exports = Station;