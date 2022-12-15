//importing services
const Patients = require("../services/patients.services");

//importing middlewares
const { stripeCustomer } = require("../middlewares/stripe");

//methods

//creating patient
const createPatient = async (req, res) => {
  try {
    const patient = req.body;

    //if patient exists?
    const existedPatient = await Patients.getExistingPatient({
      CNIC: patient.CNIC,
    });
    if (existedPatient) {
      return res.status(401).json({
        message: "Patient's CNIC has already been taken",
      });
    }
    //creating stripe customer
    const updatedPatient = await stripeCustomer(patient);

    // creating user
    const createdPatient = await Patients.patientCreate(updatedPatient);
    res.status(201).json({
      message: "Patient created successfully",
      createdPatient,
    });
  } catch (error) {
    console.log(error);
    res.status(501).json({
      error: "INTERNAL SERVER ERROR",
    });
  }
};

//uploading dp
const uploadProfileImage = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { fileName } = req;
    const toBeUpdate = {
      profileImage: `uploads/${fileName}`,
    };

    const updatedPatient = await Patients.updatePatient(patientId, toBeUpdate);
    res.status(200).json({
      message: "uploaded",
      updatedPatient,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

//update patient
const updatePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const toBeUpdate = req.body;
    const updatedPatient = await Patients.updatePatient(patientId, toBeUpdate);
    if (!updatedPatient) {
      res.status(401).json({
        message: "Updation Failed",
      });
    }
    res.status(200).json({
      message: "Updated Successfully",
      updatedPatient,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

// remove patient
const deletePatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const deletedPatientr = await Patients.removePatient(patientId);
    res.status(200).json({
      message: "Patient deleted Successfully",
      deletedPatientr,
    });
  } catch (error) {
    res.status(501).json({ error: "INTERNAL SERVER ERROR" });
  }
};

module.exports = {
  createPatient,
  uploadProfileImage,
  updatePatient,
  deletePatient,
};
