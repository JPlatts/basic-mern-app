
let nodemailer = require('nodemailer');
const sgMail = require('@sendgrid/mail');
const { smtpSettings } = require('../modules/config');

function mailer() {

  function initTransport () {
    let transport = nodemailer.createTransport({
      host: smtpSettings.server,
      port: smtpSettings.port,
      auth: {
         user: smtpSettings.user,
         pass: smtpSettings.password
      }
    });
    return transport;
  }

  this.registrationMail = async (user, link) => {
    let subject = `${smtpSettings.domain} Registration`;
    let html = `<p>Thank you for registering with ${smtpSettings.domain}</p>
                <p>Please follow this link to confirm your account registration:</p><p>
                <a href="${link}">Confirm Account</a></p>`;
    return await this.sendMail(user, subject, html);
  }

  this.pwResetMail = async (user, resetCode) => {
    let subject = `${smtpSettings.domain} Password Reset`;
    let html = `<p>Please use this code to reset your password.</p>
                <p>${resetCode}</p>`;
    return await this.sendMail(user, subject, html);
    
  }

  this.sendMail = async (user, subject, html) => {
    if (smtpSettings.useSendGrid) {
      sgMail.setApiKey(smtpSettings.sendGridKey);
      const msg = {
        to: user.email, // Change to your recipient
        from: smtpSettings.fromAddress, // Change to your verified sender
        subject: subject,
        html: html
      };
      try {
        let response = await sgMail.send(msg);
        return !!response;
      } catch(err) {
        console.log(err)
        return false;
      }
    } else {
      let transport = initTransport();
      const message = {
          from: smtpSettings.fromAddress, // Sender address
          to: user.email,         // List of recipients
          subject: subject, // Subject line
          html: html // Plain text body
      };
      let mailInfo = await transport.sendMail(message);
      return !!mailInfo;
    }
  }
}

module.exports = new mailer();