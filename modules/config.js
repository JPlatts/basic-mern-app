module.exports = {
    environment: process.env.NODE_ENV || 'development',
    sslConfig: { useSSL:process.env.USE_SSL && process.env.USE_SSL.toLowerCase() === 'true', crtFile: 'sslcert/local.crt', keyFile: 'sslcert/local.key' },
    mongoUri: process.env.MONGO_URI || 'mongodb://localhost/basic-mern-app',
    PORT: process.env.PORT || 3000,
    JWT_KEY: process.env.JWT_KEY || 'Best_Be_Overridding_THIS_for__SECURITY__',
    MTA_KEY: process.env.MTA_KEY || 'ADD YOUR MTA KEY',
    smtpSettings: {
      useSendGrid: true,
      server: process.env.SMTP_SERVER || 'smtp.server.com',
      port: process.env.SMTP_PORT || 2525,
      user: process.env.SMTP_USR || '[smtp_auth_usr]',
      password: process.env.SMTP_PWD || '[smtp_auth_pwd]',
      sendGridKey: process.env.SENDGRID_KEY || null,
      domain: process.env.WEB_DOMAIN || 'domain.com',
      fromAddress: `admin@${process.env.WEB_DOMAIN || 'domain.com'}`
    },

}