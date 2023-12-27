// attendanceController.js
import {Attendance }from "../models/attendance.js"

// Controller for creating new attendance record
export const createAttendance = async (req, res) => {
  const { username, rollnum, picture , coursename , checkInTime , date , branch , insname , postcode} = req.body;
  if (postcode == "75300" || branch == "Gulshan e Iqbal Block 2"){ try {
   

    const attendance = new Attendance({
      username,
      rollnum,
      date: date,
      coursename,
      checkInTime: checkInTime,
      picture,
      branch,
      insname,
      postcode
    
    });
  
    const savedAttendance = await attendance.save();
    res.status(201).json(savedAttendance);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}else{
  res.status(400).json({error:"sorry you are not in saylani you cannot mark your attendance"});
}
};

// Controller for getting all attendance records
export const getAllAttendance = async (req, res) => {
  try {
    const allAttendance = await Attendance.find();
    res.status(200).json(allAttendance);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAttendance = async (req, res) => {
  const { username, rollnum, coursename, picture , checkOutTime } = req.body;

  try {
    // Assuming you have a mongoose model named Attendance
    const updatedAttendance = await Attendance.findOneAndUpdate(
      { username },
      { rollnum, coursename, picture , checkOutTime },
      { new: true } // Return the updated document
    );

    if (!updatedAttendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }

    return res.status(200).json({ updatedAttendance });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};