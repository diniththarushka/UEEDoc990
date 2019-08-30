const mongoose = require('../../DBConfig/DBConnector');

const HospitalSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Address:{
        type:String,
        required:true
    },
    Phone:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('Hospital',HospitalSchema);

