# basic-mern-app
A basic single page web application (SPA) with an API for jwt based authentication, account registration, and password management.

This project is a great starter for building a web application with membership on the mern stack.

<p align="left">
  <img src="./client/src//assets/mongo-logo.svg" width="128" alt="MongoDB" title="MongoDB">&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./client/src//assets/express-logo.png" width="128" alt="Express" title="Express">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./client/src/assets/react-logo.png" width="128" alt="React" title="React">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <img src="./client/src/assets/node-logo.svg" width="128" alt="Node" title="Node">
</p>

## Table of Contents  
[Prerequisites](#Prerequisites)  
[Installation](#Installation)  
[Configuration](#Configuration)   
[Debugging](#Debugging)  

## Prerequisites
1.  git - [git-scm.com](https://git-scm.com)
2.  node/npm - [nodejs.org](https://nodejs.org)
3.  MongoDB instance - [www.mongodb.com](https://www.mongodb.com)
4.  SMTP server, or a SendGrid API account - [sendgrid.com](https://sendgrid.com)

Note:  [MailTrap.io](https://mailtrap.io) is a great substitute for a development SMPT server. Mailtrap is a sandbox smpt service that works great for running and debugging this project without having to send real emails.

## Installation
1. Clone the repository
```
git clone https://github.com/JPlatts/basic-mern-app.git
```
2. Change Directory
```
cd basic-mern-app
```
3. Install server dependencies
```
npm run install-server
```
3. Install client dependencies
```
npm run install-client
```

## Configuration
Configuration settings for this project are found in the modules/config.js file.

It is recommended that the environment variables referenced in the file be set rather than explicitly defining settings here.  Environment variables will be read first, and used if available before the settings in the config value are applied (as shown below).

Note:  Adding a '.env' file to the root of the project is an easy way to set environment values for a development environment.

Configuration JSON example:
```
{
  environment: process.env.NODE_ENV || 'development',
  sslConfig: { useSSL:process.env.USE_SSL && process.env.USE_SSL.toLowerCase() === 'true', crtFile: 'sslcert/local.crt', keyFile: 'sslcert/local.key' },
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost/basic-mevn-app',
  PORT: process.env.PORT || 3000,
  JWT_KEY: process.env.JWT_KEY || 'Best_Be_Overridding_THIS_for__SECURITY__',
  smtpSettings: {
    useSendGrid: true,
    server: process.env.SMTP_SERVER || 'smtp.server.com',
    port: process.env.SMTP_PORT || 2525,
    user: process.env.SMTP_USR || '[smtp_auth_usr]',
    password: process.env.SMTP_PWD || '[smtp_auth_pwd]',
    sendGridKey: process.env.SENDGRID_KEY || null,
    domain: process.env.WEB_DOMAIN || 'domain.com',
    fromAddress: `admin@${process.env.WEB_DOMAIN || 'domain.com'}`
}
```

.env file example:
```
PORT=3080
NODE_ENV=development
JWT_KEY=YOUR_SeCReT_JWT_KEY
SENDGRID_KEY=YOUR_SENDgrid_Key_If_You_use_sendGRID
WEB_DOMAIN=YourEmailDomain.com
```

## Debugging
Option 1: Run client and server from a single terminal (concurrently)
```
npm run dev
```
Option 2: Run the client and server in separate terminals

Terminal One:
```
npm run server
```

Terminal Two:
```
npm run client
```
