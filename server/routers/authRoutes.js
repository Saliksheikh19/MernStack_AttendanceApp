import express from "express";
import { register, login } from "../controllers/authController.js";

const authRoutes = express.Router();

// REGISTER
authRoutes.post("/register", register);

// LOGIN
authRoutes.post('/login', login);

export default authRoutes;