const mongoose = require('../../DBConfig/DBConnector');

const Ongoing = new mongoose.Schema({
	Name: {
		type: String,
		required: true,
	},
	
	Email: {
		type: String,
		required: true,
	},
	Number: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model('Ongoing', Ongoing);
