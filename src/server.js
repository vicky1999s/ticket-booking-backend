const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const serverless = require('serverless-http')

const EmailService = require('./emailService');
const BusDetails = require('./busSchema');
const Location = require('./locationSchema')
const EmailBody = require('./emailSchema');

const app = express();
const router = express.Router(); 
 
app.use(express.json())
app.use(cors())


const URI = process.env.MONGO_URI
const mongoose = require('mongoose')

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {console.log('connected to db')})
        .catch((error) => {console.log(error)})


router.get('/get', (req, res)=>{res.json({"message":"working"})})




//to get all available locations for src and dest
router.get('/locations', async (req, res) => {
        try{
            const locations = await Location.find();
            if(!locations) throw Error("no locations")
            res.status(200).json(locations);
        }catch(err){
            res.status(400).json({"message":err})
        }
        
    })

//add new bus detail
router.post('/bus', async (req, res) => {
    const newBusDetail = new BusDetails(req.body)
    try{
        const busDetail = await newBusDetail.save();
        res.status(201).json(busDetail);
    }catch(err){
        res.status(400).json(err);
    }
})

//get bus detail based on src and dest
router.get('/bus', async (req, res) => {
    try{
        const busDetail = await BusDetails.find({
            $and:[
                {"source": req.query.source},
                {"destination": req.query.destination}
            ]
        })
        res.status(200).json(busDetail)
    }catch(err){
        res.status(400).json(err);
    }
})

//find and update no of seats in bus
router.post('/bus/:id', async (req, res) => {
    try{
        const busDetail = await BusDetails.findByIdAndUpdate(req.params.id, req.body)
        console.log(busDetail)
        res.status(200).json(busDetail)
    }catch(err){
        res.status(400).json(err);
    }
})

//To email the tickets
router.post('/email', async (req, res) => {
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



app.use('/.netlify/functions/server', router)

//Initialize the sever
// app.listen(process.env.PORT || 8080, () => {
//     console.log('server listening on port:5000');
// });

module.exports.handler = serverless(app)