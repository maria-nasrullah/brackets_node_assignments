//importing dependencies
const { APPOINTMENT_STATUS_ENUM } = require("../../config/constants");
const Appointments = require("../services/appointments.services");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

    if (req.body.status === APPOINTMENT_STATUS_ENUM[2]) {
      //getting existed appointment
      const existedAppointment = await Appointments.existingAppointment(
        appointmentId
      );

      //checking already completed status of appointment
      if (existedAppointment.status === APPOINTMENT_STATUS_ENUM[2]) {
        return res.status(201).json({
          message: "Appointment already completed",
        });
      }

      //getting receipt url from stripe
      const charge = await stripe.charges.create({
        amount: 1000,
        currency: "usd",
        source: existedAppointment.patient.stripeCardId,
        customer: existedAppointment.patient.stripeCustomerId,
        description:
          "My First Test Charge (created for API docs at https://www.stripe.com/docs/api)",
      });

      toBeUpdate.stripeReceiptUrl = charge.receipt_url;
    }

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
