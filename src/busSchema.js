const mongoose = require('mongoose')

const busSchema = mongoose.Schema({
    travels_name: { type: String, required: true },
    departure_time:{ type: String, required: true },
    departure_location:{ type: String, required: true },
    arrival_time:{ type: String, required: true },
    arrival_location:{ type: String, required: true },
    duration:{ type: String, required: true },
    ratings: { type: String ,required: true },
    source: { type: String ,required: true },
    destination: { type: String ,required: true },
    seats_available: { type: Number ,required: true },
    fare: { type: String ,required: true }

})

const BusDetails = mongoose.model('busdetail', busSchema)
module.exports = BusDetails