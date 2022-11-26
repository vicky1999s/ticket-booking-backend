const express = require('express');
const router = express.Router();
const EmailBody = require('./schema');
const EmailService = require('./emailService');


router.post('/', async (req, res) => {
    try{
        const emailBody = new EmailBody(req.body)
        const body = JSON.stringify(emailBody, null,10)
        const text = body.replace('{',"").replace('}',"").replaceAll("\"", "");
        console.log(text)
        var mailOptions = {
            from: process.env.MAIL_ID,
            to: emailBody.email_id,
            subject: 'Ticket booking confirmation',
            text: text
          };
       EmailService.sendEmail(mailOptions)
       res.status(200).json({"message":"mail send successfully"})
        
    }catch(err){
        res.status(400).json({"message":err})
    }
    
})

module.exports = router;