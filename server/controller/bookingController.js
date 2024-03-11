
// Assume you're using Express.js for routing

// POST endpoint for booking a slot

const  Appointment = require("../model/appointmentSchema");
const Slot = require("../model/slotModel");


exports.bookAppointment =  async (req, res) => {
    try {
      const { doctorId, userId, date, timeslot, childName, age, reason, additionalDetails } = req.body;
  
      // Insert the appointment into the appointments table
      const appointment = await Appointment.create({
        doctorId,
        userId,
        date,
        timeslot,
        childName,
        age,
        reason,
        additionalDetails
      });
  
      res.status(201).json({ success: true, message: 'Slot booked successfully', appointment });
    } catch (error) {
      console.error('Error booking slot:', error);
      res.status(500).json({ success: false, message: 'Failed to book slot' });
    }
  };

  
// reschedule appointment

exports.reScheduleAppointment =  async (req, res) => {
  try {
    const {  date, timeslot, childName, age, reason, additionalDetails } = req.body;
    const id=req.params.id;
    // Update the appointment into the appointments table
    const appointment = await Appointment.updateOne({_id:id},{$set:req.body
    });

    res.status(201).json({ success: true, message: 'Slot Update successfully', appointment });
  } catch (error) {
    console.error('Error booking slot:', error);
    res.status(500).json({ success: false, message: 'Failed to book slot' });
  }
};















  // GET endpoint for fetching available slots for a specific date and doctor
exports.availableSlots = async (req, res) => {
    try {

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      const { doctorId, date } = req.body;
    console.log(doctorId, date, req.body);
 
const d = new Date(date);
const dayFullName = dayNames[d.getDay()];
      // Query the slots table to find available slots for the given date and doctor
      const slots = await Slot.findOne({ doctorId }).exec();
      const appointments = await Appointment.find({ doctorId, date }).exec();
     
      const availableSlots = slots? slots.week.get(dayFullName)[0].slots.filter(slot => {
        // Check if the slot is not booked (i.e., not present in appointments)
       
        return !appointments.some(appointment => appointment.timeslot === slot.timeslot);
      }): [];
  
      res.status(200).json({ success: true, availableSlots });
    } catch (error) {
      console.error('Error fetching available slots:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch available slots' });
    }
  };

  // Assuming you have already set up your Express app and imported necessary modules

 // Import the Appointment model

// Define a route to handle GET request for fetching appointments of a selected user
exports.userAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch appointments associated with the selected user from the database
    const appointments = await Appointment.find({ userId }).populate('doctorId');

    // Send the fetched appointments as a response
    res.status(200).json({
      success: true,
      data: appointments
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while fetching appointments'
    });
  }
};

exports.doctorAppointments = async (req, res) => {
    try {
      const { doctorId } = req.params;
  
      // Fetch appointments associated with the selected user from the database
      const appointments = await Appointment.find({ doctorId }).populate('userId');
  
      // Send the fetched appointments as a response
      res.status(200).json({
        success: true,
        data: appointments
      });
    } catch (error) {
      // Handle any errors that occur during the process
      console.error('Error fetching appointments:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while fetching appointments'
      });
    }
  };

  