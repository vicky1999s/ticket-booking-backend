const mangoose = require('mongoose');

const locationSchema = mangoose.Schema({
    name: String
})

const Location = mangoose.model('Location', locationSchema)

module.exports = Location;