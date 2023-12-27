// attendanceRoutes.js
import express from "express";
import { createAttendance, getAllAttendance, updateAttendance } from "../controllers/attendanceController.js";


const attendancerouter = express.Router();

// Define routes
attendancerouter.post("/createAt", createAttendance);
attendancerouter.get("/getAt", getAllAttendance);
attendancerouter.put('/updateAttendance', updateAttendance);

export default attendancerouter;
