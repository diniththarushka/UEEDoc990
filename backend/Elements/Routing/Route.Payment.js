const express = require('express');
const router = express.Router();
const DoctorAvailability = require('../Models/DocAvailability');
const Payment = require('../Models/Payment');

router.get('/',(req,res)=>{
    Payment.find().then((payment)=>{
        if(payment.length)
            res.status(200).json(payment);
        else
            res.status(200).send('Currently no payment records are available.')
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

router.post('/add',(req,res)=>{
    const reqBody = req.body;
    const id = reqBody.ChannelId;
    const PayObj = new Payment({
        Name: reqBody.Name,
        Specialization: reqBody.AppointmentNum,
        Doctor: reqBody.Doctor,
        Email: reqBody.Email,
        Phone: reqBody.Phone,
        Price: reqBody.Price,
    });
    PayObj.save().then((payment)=>{
        DoctorAvailability.find({_id:id}).then((docAv)=>{
            data=docAv[0];
            if(data.Appointments===data.MaxAppointments){
                res.status(500).json({"message":"Appontment adding failed max appointments have made for this Doctor."});
            }else{
                DoctorAvailability.findOneAndUpdate({_id:id},{Appointments:(data.Appointments+1)}).then(()=>{
                    res.status(200).json({"message":"Payment added successfully.","ref":payment.Reference})
                }).catch((err)=>{
                    res.status(500).json({"message":"Appontment adding failed. Error: "+err});
                    console.log(err);
                });
            }
        }).catch((err)=>{
            if(err){
                res.status(500).json({"message":"Appontment adding failed. Error: "+err});
                console.log(err);
            }
        })
    }).catch((err)=>{
        res.status(500).send(err);
    })
});

router.get('/byName/:name',(req,res)=>{
    let name = req.params.name;
    Payment.find({'Name':name}).then((payment)=>{
        if(payment.length)
            res.status(200).json(payment);
        else
            res.status(200).send('Currently no payment records are available.')
    }).catch((err)=>{
        res.status(500).send(err);
    })
});
module.exports = router;
