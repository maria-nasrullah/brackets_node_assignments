//importing model
const AppointmentModel = require("../models/appointments");

const scheduledAppointment = async (appointment) => {
  try {
    const newAppointment = new AppointmentModel(appointment);
    return await newAppointment.save();
  } catch (error) {
    throw error;
  }
};

//update appointment
const updateAppointment = async (appointmentId, toBeUpdate) => {
  try {
    const updatedAppointment = await AppointmentModel.findByIdAndUpdate(
      appointmentId,
      toBeUpdate,
      {
        new: true,
      }
    );
    return updatedAppointment;
  } catch (error) {
    throw error;
  }
};

//get existing appointment
const existingAppointment = async (appointmentId) => {
  try {
    // const existedAppointment = await AppointmentModel.findById(appointmentId).populate({path:'patient',model:'Patient',select:'_id'});
        const existedAppointment = await AppointmentModel.findById(appointmentId).populate('patient');
    return existedAppointment;
  } catch (error) {
    throw error;
  }
};

module.exports = { scheduledAppointment, updateAppointment,existingAppointment };
