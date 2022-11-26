const express = require('express');
const router = express.Router();
const Locations = require('./schema');

router.get('/', async (req, res) => {
    try{
        const locations = await Locations.find();
        if(!locations) throw Error("no locations")
        res.status(200).json(locations);
    }catch(err){
        res.status(400).json({"message":err})
    }
    
})

module.exports = router;