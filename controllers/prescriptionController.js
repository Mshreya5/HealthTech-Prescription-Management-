const PrescriptionModel = require('../models/prescriptionModel');
const UserModel = require('../models/userModel');

class PrescriptionController {
    static async create(req, res) {
        try {
            const { patientId, medication, dosage, notes } = req.body;
            const doctorId = req.user.id;

            if (!patientId || !medication || !dosage) {
                return res.status(400).json({
                    success: false,
                    message: 'Patient ID, medication, and dosage are required.'
                });
            }

            const patient = await UserModel.findById(patientId);
            if (!patient || patient.role !== 'patient') {
                return res.status(404).json({
                    success: false,
                    message: 'Patient not found.'
                });
            }

            const prescription = await PrescriptionModel.create(patientId, doctorId, medication, dosage, notes);

            res.status(201).json({
                success: true,
                message: 'Prescription created successfully.',
                data: prescription
            });

        } catch (error) {
            console.error('Create prescription error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error.'
            });
        }
    }

    static async update(req, res) {
        try {
            const { id } = req.params;
            const { medication, dosage, notes } = req.body;
            const doctorId = req.user.id;

            if (!medication || !dosage) {
                return res.status(400).json({
                    success: false,
                    message: 'Medication and dosage are required.'
                });
            }

            const existingPrescription = await PrescriptionModel.findById(id);
            if (!existingPrescription) {
                return res.status(404).json({
                    success: false,
                    message: 'Prescription not found.'
                });
            }

            if (existingPrescription.doctor_id !== doctorId) {
                return res.status(403).json({
                    success: false,
                    message: 'Access denied. You can only update your own prescriptions.'
                });
            }

            const updatedPrescription = await PrescriptionModel.update(id, doctorId, medication, dosage, notes);

            res.json({
                success: true,
                message: 'Prescription updated successfully.',
                data: updatedPrescription
            });

        } catch (error) {
            console.error('Update prescription error:', error);

            if (error.message.includes('Prescription not found or unauthorized')) {
                return res.status(404).json({
                    success: false,
                    message: 'Prescription not found or unauthorized.'
                });
            }

            res.status(500).json({
                success: false,
                message: 'Internal server error.'
            });
        }
    }

    static async getDoctorPrescriptions(req, res) {
        try {
            const doctorId = req.user.id;

            const prescriptions = await PrescriptionModel.findByDoctorId(doctorId);

            res.json({
                success: true,
                message: 'Prescriptions retrieved successfully.',
                data: prescriptions
            });

        } catch (error) {
            console.error('Get doctor prescriptions error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error.'
            });
        }
    }

    static async getPatientPrescriptions(req, res) {
        try {
            const patientId = req.user.id;

            const prescriptions = await PrescriptionModel.findByPatientId(patientId);

            res.json({
                success: true,
                message: 'Prescriptions retrieved successfully.',
                data: prescriptions
            });

        } catch (error) {
            console.error('Get patient prescriptions error:', error);
            res.status(500).json({
                success: false,
                message: 'Internal server error.'
            });
        }
    }
}

module.exports = PrescriptionController;