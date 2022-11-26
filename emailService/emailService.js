var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PWD
  }
});


const sendEmail = (mailOptions) => transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log(info)
    console.log('Email sent: ' + info.response);
  }
});

module.exports = {sendEmail}