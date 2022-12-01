//importing model
const patientModel = require("../models/patients");

//creating patient object
const patientCreate = async (patient) => {
  try {
    const newPatient = new patientModel(patient);
    return await newPatient.save();
  } catch (error) {
    throw error;
  }
};

//finding patient by cnic
const getExistingPatient = async ({ CNIC }) => {
  try {
    const existedPatient = await patientModel
      .findOne({ CNIC: { $eq: CNIC } })
      .lean();
    return existedPatient;
  } catch (error) {
    throw error;
  }
};

//update patient's any field
const updatePatient = async (patientId, toBeUpdate) => {
  try {
    return await patientModel
      .findByIdAndUpdate(patientId, toBeUpdate, { new: true })
      .lean();
  } catch (error) {
    throw error;
  }
};

//remove patient
const removePatient = async (patientId) => {
  try {
    return await patientModel.findByIdAndRemove(patientId);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  patientCreate,
  getExistingPatient,
  updatePatient,
  removePatient,
};
