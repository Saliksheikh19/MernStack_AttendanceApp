import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routers/userRoutes.js";
import authRoute from "./routers/authRoutes.js";
import attendancerouter from "./routers/attendanceRoutes.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to DB`);
  } catch (err) {
    console.log(err)
    console.error(err);
    throw err;
  }
};

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/attendance", attendancerouter);
// app.use("/api/products", productRoute);
// app.use("/api/carts", cartRoute);
// app.use("/api/orders", orderRoute);
// app.use("/api/checkout", stripeRoute);

app.listen(PORT, async () => {
  console.log(`Backend server is running on port ${PORT}!`);
 await connect();
});
