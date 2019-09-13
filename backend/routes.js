const express = require('express');

const HospitalRoutes = require('./Elements/Routing/Route.Hospital');
const DoctorRoutes = require('./Elements/Routing/Route.Doctor');
const DoctorAvailabilityRoutes = require('./Elements/Routing/Route.DoctorAvailability');
const PaymentRoutes = require('./Elements/Routing/Route.Payment');

const DoctorSearchRoutes = require('./Elements/Routing/Route.Doctor.Search');

const router = express.Router();

router.use('/doctor',DoctorRoutes);
router.use('/hospital',HospitalRoutes);
router.use('/availability',DoctorAvailabilityRoutes);
router.use('/payment',PaymentRoutes);

router.use('/doctor/search',DoctorSearchRoutes);

module.exports = router;
