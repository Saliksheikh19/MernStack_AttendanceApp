import express from "express"
const usersRoutes = express.Router();
import {updateUser , deleteUser ,getUserById , getAllUsers , getUserStats} from "../controllers/userController.js";
import { verifyToken , verifyTokenAndAuthorization , verifyTokenAndAdmin } from "./verifyToken.js";

// UPDATE USER
usersRoutes.put("/:id", verifyTokenAndAuthorization,updateUser);

// DELETE USER
usersRoutes.delete("/:id", verifyTokenAndAuthorization,deleteUser);

// GET USER BY ID
usersRoutes.get("/find/:id", verifyTokenAndAdmin,getUserById);

// GET ALL USERS
usersRoutes.get("/", verifyTokenAndAdmin,getAllUsers);

// GET USER STATS
usersRoutes.get("/stats", verifyTokenAndAdmin,getUserStats);

export default usersRoutes
