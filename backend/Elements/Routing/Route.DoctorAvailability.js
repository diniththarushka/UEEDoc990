const express = require('express');
const router = express.Router();

const Doctor=require('../Models/Doctor');
const Hospital = require('../Models/Hospital');
const DoctorAvailability = require('../Models/DocAvailability');

router.get('/',(req,res)=>{
    DoctorAvailability.find().then((doctors)=>{
        if(doctors.length)
            res.status(200).json(doctors);
    }).catch((err)=>{
        res.status(500).json({"message":"No Doctor availability records found.\nMore about this error:"+err});
    })
});

router.get('/byName/:name',(req,res)=>{
    let name = req.params.name;

    Doctor.find({Name:name}).then((doctorArr)=>{
        let doctor = doctorArr[0];
        DoctorAvailability.find({DoctorData:doctor._id}).then((doctorAvailableRecArr)=>{
            let AVArray=[];
            for(let i=0;i<doctorAvailableRecArr.length;i++){
                let current = doctorAvailableRecArr[i];
                Hospital.find({'_id':current.HospitalData}).then((hospitalArr)=>{
                    let hospital = hospitalArr[0];

                    let Obj = {
                        "Hospital":{
                            "Name":hospital.Name,
                            "Address":hospital.Address
                        },
                        "_id":current._id,
                        "StartTime":current.StartTime,
                        "EndTime": current.EndTime,
                        "Appointments":current.Appointments,
                        "MaxAppointments":current.MaxAppointments
                    };
                    AVArray.push(Obj);
                    if(AVArray.length === doctorAvailableRecArr.length){
                        let AvailabilityRecord={
                            "Doctor":{
                                "Name":doctor.Name,
                                "Specialization":doctor.Specialization
                            },
                            "Availability":AVArray
                        };
                        res.status(200).json(AvailabilityRecord);
                    }
                }).catch((err)=>{
                    console.error('Error:'+err);
                })
            }
        }).catch((err)=>{
            console.log("here1");
            res.status(500).json({"message":"Can't find availability slots for Dr."+name});
        })
    }).catch((err)=>{
        console.log("here2");
        res.status(500).send({"msg":"Can't find Doctor for Dr."+name});
    })
});

router.get('/:id',(req,res)=>{
    let id = req.params.id;
    DoctorAvailability.find({_id:id}).then((doctors)=>{
        let doctor = doctors[0];
        if(doctors.length)
            res.status(200).json({"Doctor":doctor});
    }).catch((err)=>{
        res.status(500).json({"message":"Doctor not found. Error: "+err});
    })
});

router.post('/add',(req,res)=>{
    const reqBody = req.body;
    const DocObj = new DoctorAvailability({
        DoctorData: reqBody.DoctorData,
        HospitalData: reqBody.HospitalData,
        StartTime: reqBody.StartTime,
        EndTime: reqBody.EndTime,
        MaxAppointments: reqBody.MaxAppointments,
        Appointments:0
    });
    DocObj.save().then((doctor)=>{
        res.status(200).send('Doctor Availability, added successfully');
    }).catch((err)=>{
        res.status(500).json({"message":err});
    })
});

module.exports = router;
