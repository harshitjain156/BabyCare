const express = require('express');
const {availableSlots, bookAppointment, userAppointments, doctorAppointments, reScheduleAppointment, deleteAppointment} = require("../controller/bookingController");
const router = express.Router();


// router.post("/sendotp", sendOtp);
router.post("/book-slot", bookAppointment);

router.post("/available-slots", availableSlots);

router.get("/user-appointments/:userId", userAppointments);
router.get("/doctor-appointments/:doctorId", doctorAppointments);

router.patch('/reschedule/:id',reScheduleAppointment);

router.delete('/cancel/:id',deleteAppointment);
module.exports = router;
