const express = require('express');
const router = express.Router();
const BusDetails = require('./schema');

router.post('/', async (req, res) => {
    const newBusDetail = new BusDetails(req.body)
    try{
        const busDetail = await newBusDetail.save();
        res.status(201).json(busDetail);
    }catch(err){
        res.status(400).json(err);
    }
})

router.get('/', async (req, res) => {
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


router.post('/:id', async (req, res) => {
    try{
        const busDetail = await BusDetails.findByIdAndUpdate(req.params.id, req.body)
        console.log(busDetail)
        res.status(200).json(busDetail)
    }catch(err){
        res.status(400).json(err);
    }
})

module.exports = router
