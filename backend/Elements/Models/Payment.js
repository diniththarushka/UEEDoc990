const mongoose = require('../../DBConfig/DBConnector');

const PaymentSchema = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    AppointmentNum:{
        type:Number
    },
    Doctor:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        required:true
    },
    Phone:{
        type:String,
        required:true
    },
    Reference:{
        type:String,
        default:'REF'+Date.now()
    }
});

module.exports = mongoose.model('Payment',PaymentSchema);

