const mongoose = require('../../DBConfig/DBConnector');

const DoctorSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Specialization:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Password:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Doctor',DoctorSchema);

