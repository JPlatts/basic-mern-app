//load environment variables from .env file for environments other than production
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const { PORT } = require('./modules/config');
const cors = require('cors');
const morgan = require('morgan');
const history = require('connect-history-api-fallback');
const { sslConfig } = require('./modules/config');
const { environment } = require('./modules/config');


app.use(cors())
app.use(morgan('tiny'))
app.use(express.json())

//initialize mongo db
const db = require('./modules/init-db');

app.use('/api/users', require('./routes/users'));
app.use('/api/deciders', require('./modules/auth-middleware'));
app.use('/api/deciders', require('./routes/deciders'));

if (environment === 'production' || environment === 'test') {
    app.use(history({ verbose:true }));
    app.use(express.static('client/dist'));
}

if (sslConfig.useSSL) {
  
  
  try {
    const fs = require('fs');
    const  https = require('https');
    var privateKey  = fs.readFileSync(sslConfig.keyFile, 'utf8');
    var certificate = fs.readFileSync(sslConfig.crtFile, 'utf8');  
    var credentials = {key: privateKey, cert: certificate};
    var httpsServer = https.createServer(credentials, app);
    httpsServer.listen(PORT, () => {
      console.log(`Environment - ${environment}`);
      console.log(`basic-app listening for https requests on port ${PORT} at https://localhost:${PORT}`)
    });

    var http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
        res.end();
    }).listen(80);

  } catch (error) {
    console.log('Error reading SSL certificate. Check config file for location settings.');
    console.log(error);
  }
  

} else {
  app.listen(PORT, () => {
    console.log(`Environment - ${environment}`);
    console.log(`basic-app listening for http requests on port ${PORT} at http://localhost:${PORT}`)
  });
}


