//importing services
const Appointments = require("../services/appointments.services");

const appointmentSchedule = async (req, res) => {
  try {
    const appointment = req.body;
    const scheduledAppointment = await Appointments.scheduledAppointment(
      appointment
    );
    console.log("app");
    res.status(201).json({
      message: "Appointment successfully created",
      scheduledAppointment,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

//updating status of appointment
const appointmentUpdate = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const toBeUpdate = req.body;
    const updatedAppointment = await Appointments.updateAppointment(
      appointmentId,
      toBeUpdate
    );
    res.status(201).json({
      message: "Appointment updated",
      updatedAppointment,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

module.exports = { appointmentSchedule, appointmentUpdate };
