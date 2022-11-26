const mongoose = require('mongoose')

const EmailBodySchema = mongoose.Schema({
    email_id: {type: String, required: true},
    travels_name: {type: String, required: true},
    total_passengers: {type: String, required: true},
    passenger_names: {type: String, required: true},
    departure_time: {type: String, required: true},
    departure_location: {type: String, required: true},
    arrival_time: {type: String, required: true},
    arrival_location: {type: String, required: true},
    duration: {type: String, required: true},
    total_fare: {type: Number, required: true},
}) 

module.exports = mongoose.model('emailbody',  EmailBodySchema)