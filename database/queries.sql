-- Register / Create User
INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);

-- Find User by Email (Login)
SELECT id, name, email, password, role FROM users WHERE email = ?;

-- Find User by ID
SELECT id, name, email, role FROM users WHERE id = ?;

-- Create Prescription
INSERT INTO prescriptions (patient_id, doctor_id, medication, dosage, notes) VALUES (?, ?, ?, ?, ?);

-- Update Prescription (Doctor Only)
UPDATE prescriptions SET medication = ?, dosage = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND doctor_id = ?;

-- Get All Prescriptions by Doctor
SELECT p.id, p.patient_id, u.name as patient_name, p.medication, p.dosage, p.notes, p.created_at, p.updated_at
FROM prescriptions p
JOIN users u ON p.patient_id = u.id
WHERE p.doctor_id = ?
ORDER BY p.created_at DESC;

-- Get All Prescriptions by Patient
SELECT p.id, p.doctor_id, u.name as doctor_name, p.medication, p.dosage, p.notes, p.created_at, p.updated_at
FROM prescriptions p
JOIN users u ON p.doctor_id = u.id
WHERE p.patient_id = ?
ORDER BY p.created_at DESC;

-- Find Prescription by ID
SELECT id, patient_id, doctor_id FROM prescriptions WHERE id = ?;

-- Delete Prescription (Doctor Only)
DELETE FROM prescriptions WHERE id = ? AND doctor_id = ?;
