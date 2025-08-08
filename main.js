class Person {
  name;
  age;
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  getDetails() {
    return `${this.name},Age:${this.age}`;
  }
}
class Patient extends Person {
  constructor(id, name, age, symptoms, assignedDoctor) {
    super(name, age);
    this.id = id;
    this.symptoms = symptoms;
    this.assignedDoctor = assignedDoctor;
    this.appointments = [];
  }
  updateInfo({ name, age, symptoms, assignedDoctor }) {
    if (name) this.name = name;
    if (age) this.age = age;
    if (symptoms) this.symptoms = symptoms;
    if (assignedDoctor) this.assignedDoctor = assignedDoctor;
    console.log("Info updated Successfully");
  }
  viewAppointments() {
    if (this.appointments.length === 0) {
      console.log("No scheduled appointments");
      return;
    }
    console.log(`Appointments for ${this.name}:`);
    this.appointments.forEach((apmt, idx) => {
      console.log(`${idx + 1}. ${apmt.details()}`);
    });
  }
}
class Doctor extends Person {
  constructor(name, age, specialization) {
    super(name, age);
    this.specialization = specialization;
    this.schedule = [];
  }
  addAppointment(appointment) {
    this.schedule.push(appointment);
  }
  viewAppointmentsByDate(date) {
    const result = this.schedule.filter((apmt) => apmt.date == date);
    console.log(`the appointment for Dr.${this.name} on ${date}:`);
    result.forEach((apmt, idx) => {
      console.log(`${idx + 1}.${apmt.details()}`);
    });
  }
  isAvailable(date, time) {
    const conflict = this.schedule.filter(
      (apmt) => apmt.date === date && apmt.time === time
    );
    return conflict.length === 0;
  }
}
class Appointment {
  constructor(patient, doctor, time, date, problem) {
    this.patient = patient;
    this.doctor = doctor;
    this.time = time;
    this.date = date;
    this.problem = problem;
    this.status = "Scheduled";
  }
  rescheduleAppointment(newTime, newDate) {
    this.time = newTime;
    this.date = newDate;
    this.status = "Rescheduled";
  }
  checkedIn() {
    this.status = "Ongoing";
  }
  completed() {
    this.status = "Completed";
  }
  cancel() {
    this.status = "Cancelled";
  }
  details() {
    return `Appointment is with ${this.doctor.name} on ${this.time} at ${this.date}  |Reason:${this.problem}|status:${this.status}`;
  }
}
class AppointmentSystem {
  constructor() {
    this.patients = [];
    this.doctors = [];
    this.appointments = [];
  }

  addPatient(patient) {
    this.patients.push(patient);
  }

  addDoctor(doctor) {
    this.doctors.push(doctor);
  }

  addAppointment(appointment) {
    this.appointments.push(appointment);
  }

  searchPatientByName(name) {
    const result = this.patients.filter(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    console.log(
      JSON.stringify(
        result.map((patient) => ({
          name: patient.name,
          age: patient.age,
          doctor: patient.assignedDoctor.name,
        })),
        null,
        2
      )
    );
  }

  searchPatientById(id) {
    const result = this.patients.filter(
      (p) => p.id.toLowerCase() === id.toLowerCase()
    );
    console.log(
      JSON.stringify(
        result.map((patient) => ({
          id: patient.id,
          name: patient.name,
          age: patient.age,
          doctor: patient.assignedDoctor.name,
        })),
        null,
        2
      )
    );
  }

  searchPatientBySymptom(symptom) {
    const result = this.patients.filter((p) =>
      p.symptoms.toLowerCase().includes(symptom.toLowerCase())
    );
    console.log(
      JSON.stringify(
        result.map((patient) => ({
          name: patient.name,
          age: patient.age,
          symptom: patient.symptoms,
        })),
        null,
        2
      )
    );
  }

  listDoctorsBySpecializationAndSlot(specialization, date, time) {
    const result = this.doctors.filter(
      (d) =>
        d.specialization.toLowerCase() === specialization.toLowerCase() &&
        d.isAvailable(date, time)
    );
    console.log(
      JSON.stringify(
        result.map((doctor) => ({
          name: doctor.name,
          age: doctor.name,
          specialization: doctor.specialization,
        })),
        null,
        2
      )
    );
  }

  markNoShow(appointment) {
    appointment.status = "No-Show";
  }

  reportAppointmentsPerDoctor() {
    const report = {};
    this.appointments.forEach((apmt) => {
      const doctorName = apmt.doctor.name;
      report[doctorName] = (report[doctorName] || 0) + 1;
    });
    return report;
  }

  reportPatientsVisitedOnDate(date) {
    return this.appointments.filter(
      (a) => a.date === date && a.status === "Completed"
    ).length;
  }
}

//MOCK DATA

//Doctor
const drsharma = new Doctor("Abhijey sharma", 56, "cardiology");
const drmishra = new Doctor("Ronak mishra", 45, "neurology");

//Patient
const patient1 = new Patient("P001", "Ravi jain", 30, "Chest Pain", drsharma);
const patient2 = new Patient("P002", "shiv ghai", 30, "Neck Pain", drmishra);

//Appointments
const apmt1 = new Appointment(
  patient1,
  drsharma,
  "10:00",
  "2025-08-09",
  "Consultation"
);
const apmt2 = new Appointment(
  patient2,
  drmishra,
  "09:00",
  "2025-08-09",
  "Follow-up"
);

//Add appointments
drsharma.addAppointment(apmt1);
drmishra.addAppointment(apmt2);

patient1.appointments.push(apmt1);
patient2.appointments.push(apmt2);

//test
console.log("patient Appointments");
patient1.viewAppointments();
patient2.viewAppointments();

console.log("\nDoctor Availability");
console.log(
  "Dr. Sharma available at 10:00?",
  drsharma.isAvailable("2025-08-09", "10:00")
);
console.log(
  "Dr. Mishra available at 12:00?",
  drmishra.isAvailable("2025-08-09", "12:00")
);

console.log("\nView Doctor Appointments");
drsharma.viewAppointmentsByDate("2025-08-09");

console.log("\nReschedule + Check-in");
apmt1.rescheduleAppointment("09:00", "2025-08-10");
apmt1.checkedIn();
apmt1.completed();
patient1.viewAppointments();

patient1.updateInfo({ name: "Ravi Kumar", symptoms: "Shortness of breath" });
console.log(patient1.getDetails(), "| Symptoms:", patient1.symptoms);

//search functionality
const system = new AppointmentSystem();
system.addDoctor(drsharma);
system.addDoctor(drmishra);

system.addPatient(patient1);
system.addPatient(patient2);

system.addAppointment(apmt1);
system.addAppointment(apmt2);

console.log("\nSearch Patient by Name:");
system.searchPatientByName("Ravi Kumar");

console.log("\nSearch Patient by Id:");
system.searchPatientById("P001");

console.log("\nSearch Patient by Symptom:");
system.searchPatientBySymptom("Neck Pain");

console.log("\nList Doctors by Specialization & Slot:");
system.listDoctorsBySpecializationAndSlot("Cardiology", "2025-08-09", "11:00");

system.markNoShow(apmt2);
console.log(apmt2.details());

console.log("\nReport: Appointments per Doctor");
console.log(system.reportAppointmentsPerDoctor());

console.log("\nReport: Patients visited on date 2025-08-10");
console.log(system.reportPatientsVisitedOnDate("2025-08-10"));
