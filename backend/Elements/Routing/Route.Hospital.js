const express = require('express');
const router = express.Router();

const Hospital = require('../Models/Hospital');

router.get('/',(req,res)=>{
    Hospital.find().then((hospitals)=>{
        if(hospitals.length)
            res.status(200).json(hospitals);
        else
            res.status(200).send('Currently no hospital records are available.')
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

router.post('/add',(req,res)=>{
    const reqBody = req.body;
    const HospitalObj = new Hospital({
        Name: reqBody.Name,
        Address: reqBody.Address,
        Phone: reqBody.Phone
    });
    HospitalObj.save().then((hospital)=>{
        res.status(200).send('Hospital: '+hospital.Name+', added successfully');
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

module.exports = router;
