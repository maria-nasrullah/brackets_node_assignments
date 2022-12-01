const mongoose = require('mongoose');


const appointmentSchemaa=new mongoose.Schema({
userId:{
    type:mongoose.Types.ObjectId,
    ref:'User'
},
patientName:{
    type:String,
    time:true
},
startTime:{type:Date},
endTime:{type:Date},
status:{
    type:String,
    enum:APPOINTMENT_STATUS_ENUM
}
},
{
    timestamps:true,
    strict:true,
    collection:"appointments"
}
)

module.exports=mongoose.model("Appointment",appointmentSchemaa)