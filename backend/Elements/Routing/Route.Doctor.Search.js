const express = require('express');
const router = express.Router();

const Doctor = require('../Models/Doctor');

router.post('/byName',(req,res)=>{
    const reqBody = req.body;
    Doctor.find({Name:reqBody.Name}).then((doc)=>{
        if(doc.length){
            let doctor=doc[0];
            const FilteredDoc = {
                Name: doctor.Name,
                Specialization:doctor.Specialization,
                Email: doctor.Email
            };
            res.status(200).json(FilteredDoc);
        }else
            res.status(200).send('No data found');
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

module.exports = router;
