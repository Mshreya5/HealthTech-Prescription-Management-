# HealthTech Prescription Management System

A simple backend system for managing prescriptions with user login.

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Add a `.env` file in the project root with:
   ```env
   JWT_SECRET=healthtech_secret_key
   PORT=3000
   ```

3. The database starts empty. No users or prescriptions exist until you add them.

4. Start the server:
   ```bash
   node app.js
   ```

5. Server runs on `http://localhost:3000`

## Notes

- No sample users are preloaded.
- Use `POST /auth/register` to create a new patient.
- Use `POST /auth/login` to sign in after registration.

## Postman Examples

### 1. Register New Patient
```
Method: POST
URL: http://localhost:3000/auth/register
Headers:
  Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "patient"
}
```

### 2. Login as Doctor
```
Method: POST
URL: http://localhost:3000/auth/login
Headers:
  Content-Type: application/json

Body:
{
  "email": "doctor@example.com",
  "password": "password123"
}
```

**Copy the token from response for next requests**

### 3. Create Prescription (Doctor Only)
```
Method: POST
URL: http://localhost:3000/prescriptions/create
Headers:
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Body:
{
  "patientId": 2,
  "medication": "Paracetamol",
  "dosage": "500mg twice daily",
  "notes": "Take after meals"
}
```

### 4. Update Prescription (Doctor Only)
```
Method: PUT
URL: http://localhost:3000/prescriptions/update/1
Headers:
  Content-Type: application/json
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

Body:
{
  "medication": "Ibuprofen",
  "dosage": "400mg three times daily",
  "notes": "Take with food"
}
```

### 5. Get Doctor's Prescriptions (Doctor Only)
```
Method: GET
URL: http://localhost:3000/prescriptions/doctor
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 6. Get Patient's Prescriptions (Patient Only)
```
Method: GET
URL: http://localhost:3000/prescriptions/patient
Headers:
  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## API Endpoints

- `POST /auth/register` - Register patient
- `POST /auth/login` - Login (doctor/patient)
- `POST /prescriptions/create` - Create prescription (doctor only)
- `PUT /prescriptions/update/:id` - Update prescription (doctor only)
- `GET /prescriptions/doctor` - Get doctor's prescriptions (doctor only)
- `GET /prescriptions/patient` - Get patient's prescriptions (patient only)

## Database Tables

### Users
- id, name, email, password, role, created_at

### Prescriptions
- id, patient_id, doctor_id, medication, dosage, notes, created_at, updated_at

## Features

- User registration and login
- JWT token authentication
- Role-based access (doctor/patient)
- Prescription CRUD operations
- SQLite database
- Password hashing
- Input validation