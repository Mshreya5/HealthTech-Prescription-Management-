const express = require('express');
const PrescriptionController = require('../controllers/prescriptionController');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.post('/create', roleMiddleware('doctor'), PrescriptionController.create);
router.put('/update/:id', roleMiddleware('doctor'), PrescriptionController.update);
router.get('/doctor', roleMiddleware('doctor'), PrescriptionController.getDoctorPrescriptions);
router.get('/patient', roleMiddleware('patient'), PrescriptionController.getPatientPrescriptions);

module.exports = router;