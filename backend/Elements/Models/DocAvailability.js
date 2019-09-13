const mongoose = require('../../DBConfig/DBConnector');
const Doctor = require('../Models/Doctor');
const Hospital = require('../Models/Hospital');

const DoctorAvailabilitySchema = new mongoose.Schema({
    DoctorData:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Doctor,
        required:true
    },
    HospitalData:{
        type:mongoose.Schema.Types.ObjectId,
        ref:Hospital,
        required:true
    },
    StartTime:{
        type:Date,
    },
    EndTime:{
        type:Date,
    },
    Appointments:{
        type:Number,
    },
    MaxAppointments:{
        type:Number,
        required:true
    }
});

module.exports = mongoose.model('DoctorAvailability',DoctorAvailabilitySchema);

