import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer"
import {User} from "../models/User.js";

export const register = async (req, res) => {
  console.log('signup Api working');

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      username: req.body.username,
      email: req.body.email,
      rollnum: req.body.rollnum,
      picture: req.body.picture,
      coursename: req.body.coursename,
      password: hashedPassword,
    });

    const newUser = await user.save();
    res.status(200).send({
      status: 'success',
      message: 'User registered successfully',
      userInDB: newUser,
    });
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
      }
    });
  
    // this is Comment
    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: 'registered Successfully',
      text: `
        Hey Student ${req.body.username}, apka account smit online attendance k liye register krdia gya hai Ye rha apka emai aur pass jis kr thru ap login kreingy password: ${req.body.password} and email: ${req.body.email} `
    };
  
    // Send the email
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.error('Error:', error);
        res.status(500).send(error.message); // Handle email sending error
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send();
      }
    });

  } catch (error) {
    res.status(500).send(error);
  }
 


};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).send('User not found');
      return;
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
      res.status(400).send('Incorrect password');
      return;
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
    console.log(accessToken);

  } catch (err) {
    res.status(500).json(err);
  }
};
