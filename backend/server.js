const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes');

const server = express();

const PORT = 4000;

server.use(cors());
server.use(bodyParser.urlencoded({extended:false}));
server.use(bodyParser.json());

server.use('/',router);

server.listen(PORT,(err)=>{
    if(err){
        console.error(err);
    }else
        console.log("Server is up and running in Port: "+PORT);
});
