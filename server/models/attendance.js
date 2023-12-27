// attendanceModel.js
import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    rollnum: { type: String, required: true },
    date: { type: String, required: true },
    coursename: { type: String, required: true },
    picture: { type: String, required: true },
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String },
    postcode: { type: String , required:true },
    branch: { type: String ,required:true },
    
  },
  { timestamps: true }
);


export const Attendance = mongoose.model('Attendance', AttendanceSchema)
