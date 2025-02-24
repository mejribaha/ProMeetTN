const express = require("express");
const mongoose = require('mongoose')
require('dotenv').config()
const app = express();

app.use(express.json()); //middleware pqrsing body to json object
/*const users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

const appointments = [
  { id: 1, user: 1, professional: "Dr. Smith", date: "2024-02-20" },
  { id: 2, user: 2, professional: "Coach Mike", date: "2024-02-21" },
];*/

// CRUD of Appoinments
app.post("/api/appointments/create", (req, res) => {
  const newAppointment = { id: appointments.length + 1, ...req.body };
  appointments.push(newAppointment);
  res.status(201).json(newAppointment);
});

app.get("/api/appointments", (req, res) => {
  res.json(appointments);
});

app.put("/api/appointments/update/:id", (req, res) => {
  const appointment = appointments.find((a) => a.id == req.params.id);
  if (!appointment)
    return res.status(404).json({ message: "Appointment not found" });
  Object.assign(appointment, req.body);
  res.json(appointment);
});

app.delete("/api/appointments/delete/:id", (req, res) => {
  const index = appointments.findIndex((a) => a.id == req.params.id);
  if (index === -1)
    return res.status(404).json({ message: "Appointment not found" });
  appointments.splice(index, 1);
  res.json({ message: "Appointment deleted" });
});

// CRUD of users

app.post("/api/users/create", (req, res) => {
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.put("/api/users/update/:id", (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return res.status(404).json({ message: "User not found" });
  Object.assign(user, req.body);
  res.json(user);
});

app.delete("/api/users/delete/:id", (req, res) => {
  const index = users.findIndex((u) => u.id == req.params.id);
  if (index === -1) return res.status(404).json({ message: "User not found" });
  users.splice(index, 1);
  res.json({ message: "User deleted" });
});

app.get("/", (req, res) => {
  res.send("Hello World!");
  res.json({ message: "hello" });
  res.end({ message: "do this ans skip other requests" });
  res.statusCode(404).send({ message: "product not found" });
});


mongoose.connect(process.env.MONGO_URI)
        .then(()=>{
            console.log('connected to server database ')
        }).catch(err=>(
            console.log('error connecting to server database')
        ))
const PORT =process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('listening on port'+ PORT)
})