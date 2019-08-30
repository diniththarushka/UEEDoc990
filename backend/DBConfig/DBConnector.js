const mongoose = require('mongoose');

const DB_Name = "Doc990UEE";

mongoose.connect("mongodb://localhost:27017/"+DB_Name,{useNewUrlParser:true}).then(()=>{
    console.log('Database connection established.');
}).catch((err)=>{
   console.log(err);
});

module.exports = mongoose;
