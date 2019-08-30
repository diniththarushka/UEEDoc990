const express = require('express');
const router = express.Router();

const DoctorAvailability = require('../Models/DocAvailability');

router.get('/',(req,res)=>{
    DoctorAvailability.find().then((doctors)=>{
        if(doctors.length)
            res.status(200).json(doctors);
        else
            res.status(200).send('Currently no doctors are available.')
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    DoctorAvailability.find({_id:id}).then((doctors)=>{
        let doctor = doctors[0];
        if(doctors.length)
            res.status(200).json(doctor.DoctorData);//here -------------------------
        else
            res.status(200).send('Currently no doctors are available.')
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

router.post('/add',(req,res)=>{
    const reqBody = req.body;
    const DocObj = new DoctorAvailability({
        DoctorData: reqBody.DoctorData,
        HospitalData: reqBody.HospitalData,
        StartTime: reqBody.StartTime,
        EndTime: reqBody.EndTime,
        MaxAppointments: reqBody.MaxAppointments
    });
    DocObj.save().then((doctor)=>{
        res.status(200).send('Doctor: '+doctor.DoctorData.Name+', added to '+doctor.HospitalData.Name+'successfully');
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

module.exports = router;
