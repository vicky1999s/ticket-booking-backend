var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vsv9071@gmail.com',
    pass: 'jklyjckknahessql'
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