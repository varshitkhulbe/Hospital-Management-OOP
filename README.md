# Hospital Appointment Management System

A simple **JavaScript-based CLI system** to manage hospital appointments, doctors, and patients.  
This project is a practice implementation of **OOP concepts**, including classes, inheritance, and object interactions.

---

## Features

### Patient Management
- Add and manage patient details (name, age, symptoms, assigned doctor)
- Update patient information
- View a patient's appointments

### Doctor Management
- Add and manage doctors (name, age, specialization)
- Check doctor availability for a given date and time
- View doctor's appointments by date

### Appointment Management
- Schedule appointments with doctors
- Reschedule, check-in, complete, or cancel appointments
- Mark no-show appointments

### Search & Reports
- Search patients by name, ID, or symptom
- List available doctors by specialization and time slot
- Generate reports:
  - Number of appointments per doctor
  - Number of patients visited on a specific date

---

## Classes

1. **Person** - Base class for common attributes like `name` and `age`.
2. **Patient** - Inherits from `Person`, includes `id`, `symptoms`, `assignedDoctor`, and appointments.
3. **Doctor** - Inherits from `Person`, includes `specialization` and schedule.
4. **Appointment** - Handles appointment details, status updates, and rescheduling.
5. **AppointmentSystem** - Manages patients, doctors, appointments, and provides search/report functionality.

---

Sample Data
Doctors: Dr. Abhijey Sharma (Cardiology), Dr. Ronak Mishra (Neurology)

Patients: Ravi Kumar (Chest Pain), Shiv Ghai (Neck Pain)

Appointments: Scheduled for specific times and dates with the respective doctors

Learning Goals
Practice OOP in JavaScript: classes, inheritance, method overriding

Understand relationships between objects: patients, doctors, appointments

Implement basic scheduling and search logic

Future Enhancements
Convert CLI into an interactive console application

Integrate with a database for persistent storage

Add user authentication and role-based access (Admin, Doctor, Receptionist)

Add notifications/reminders for appointments
