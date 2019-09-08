const express = require('express');
const router = express.Router();

const Number = require('../Models/CheckOngoingNumber');

router.get('/', (req, res) => {
	Doctor.find()
		.then(doctors => {
			if (doctors.length) res.status(200).json(doctors);
			else res.status(200).send('Currently no doctor records are available.');
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

router.post('/add2', (req, res) => {
	const reqBody = req.body;
	const OnObj = new Number({
		Name: reqBody.Name,

		Email: reqBody.Email,

		Number: reqBody.Number,
	});
	OnObj.save()
		.then(doctor => {
			res.status(200).send('Doctor: ' + doctor.Name + ', added successfully');
		})
		.catch(err => {
			res.status(500).send(err);
		});
});

module.exports = router;
