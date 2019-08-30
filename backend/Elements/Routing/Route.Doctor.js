const express = require('express');
const router = express.Router();

const Doctor = require('../Models/Doctor');

router.get('/',(req,res)=>{
    Doctor.find().then((doctors)=>{
        if(doctors.length)
            res.status(200).json(doctors);
        else
            res.status(200).send('Currently no doctor records are available.')
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

router.post('/add',(req,res)=>{
    const reqBody = req.body;
    const DocObj = new Doctor({
        Name: reqBody.Name,
        Specialization: reqBody.Specialization,
        Email: reqBody.Email,
        Password: reqBody.Password,
        Phone: reqBody.Phone
    });
    DocObj.save().then((doctor)=>{
        res.status(200).send('Doctor: '+doctor.Name+', added successfully');
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

module.exports = router;
