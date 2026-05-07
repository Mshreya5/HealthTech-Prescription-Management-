INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?);
SELECT id, name, email, password, role FROM users WHERE email = ?;
INSERT INTO prescriptions (patient_id, doctor_id, medication, dosage, notes) VALUES (?, ?, ?, ?, ?);
UPDATE prescriptions SET medication = ?, dosage = ?, notes = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND doctor_id = ?;
SELECT p.id, p.patient_id, u.name as patient_name, p.medication, p.dosage, p.notes, p.created_at, p.updated_at
FROM prescriptions p
JOIN users u ON p.patient_id = u.id
WHERE p.doctor_id = ?
ORDER BY p.created_at DESC;
SELECT p.id, p.doctor_id, u.name as doctor_name, p.medication, p.dosage, p.notes, p.created_at, p.updated_at
FROM prescriptions p
JOIN users u ON p.doctor_id = u.id
WHERE p.patient_id = ?
ORDER BY p.created_at DESC;
SELECT id, patient_id, doctor_id FROM prescriptions WHERE id = ?;
DELETE FROM prescriptions WHERE id = ? AND doctor_id = ?;