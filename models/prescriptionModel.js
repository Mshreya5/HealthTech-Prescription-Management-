const db = require('../config/db');

class PrescriptionModel {
    static async create(patientId, doctorId, medication, dosage, notes) {
        try {
            const result = await db.run(
                'INSERT INTO prescriptions (patient_id, doctor_id, medication, dosage, notes) VALUES (?, ?, ?, ?, ?)',
                [patientId, doctorId, medication, dosage, notes || '']
            );

            return { id: result.id, patientId, doctorId, medication, dosage, notes };
        } catch (error) {
            throw new Error('Error creating prescription: ' + error.message);
        }
    }

    static async update(id, doctorId, medication, dosage, notes) {
        const result = await db.run(
            'UPDATE prescriptions SET medication = ?, dosage = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND doctor_id = ?',
            [medication, dosage, notes || '', id, doctorId]
        );

        if (result.changes === 0) {
            throw new Error('Prescription not found or unauthorized');
        }

        return { id, medication, dosage, notes };
    }

    static async findById(id) {
        try {
            const prescription = await db.get(
                'SELECT id, patient_id, doctor_id FROM prescriptions WHERE id = ?',
                [id]
            );
            return prescription;
        } catch (error) {
            throw new Error('Error finding prescription: ' + error.message);
        }
    }

    static async findByDoctorId(doctorId) {
        try {
            const prescriptions = await db.all(
                `SELECT p.id, p.patient_id, u.name as patient_name, p.medication, p.dosage, p.notes, p.created_at, p.updated_at
                 FROM prescriptions p
                 JOIN users u ON p.patient_id = u.id
                 WHERE p.doctor_id = ?
                 ORDER BY p.created_at DESC`,
                [doctorId]
            );
            return prescriptions;
        } catch (error) {
            throw new Error('Error finding prescriptions: ' + error.message);
        }
    }

    static async findByPatientId(patientId) {
        try {
            const prescriptions = await db.all(
                `SELECT p.id, p.doctor_id, u.name as doctor_name, p.medication, p.dosage, p.notes, p.created_at, p.updated_at
                 FROM prescriptions p
                 JOIN users u ON p.doctor_id = u.id
                 WHERE p.patient_id = ?
                 ORDER BY p.created_at DESC`,
                [patientId]
            );
            return prescriptions;
        } catch (error) {
            throw new Error('Error finding prescriptions: ' + error.message);
        }
    }
}

module.exports = PrescriptionModel;