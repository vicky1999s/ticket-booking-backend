const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())

const { URI } = require('./config/database.config.js') 
const mongoose = require('mongoose')
const locationDetails = require('./locations/controller')
const busDetails = require('./buses/controller')
const emailService = require('./emailService/controller')

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => {console.log('connected to db')})
        .catch((error) => {console.log(error)})


app.get('/', (req, res)=>{res.json({"message":"working"})})



app.use('/location', locationDetails);
app.use('/bus', busDetails);
app.use('/email', emailService)
//Initialize the sever
app.listen(process.env.PORT || 8080, () => {
    console.log('server listening on port:5000');
});