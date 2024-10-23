import { mongooseConnect } from "@/lib/mongoose";
import { Contacts } from "@/models/Contacts";

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "eyewareecommerce@gmail.com",
    pass: "ejeoiccorrcurxvc",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "eyewareecommerce@gmail.com", // sender address
    to, // list of receivers
    subject, // Subject line
    text, // plain text body
    html, // html body
  });
}

export default async function POST(req, res) {
  await mongooseConnect();
  try {
    const { username, email, message } = req.body;
    const newUser = new Contacts({ username, email, message });
    sendMail(
      email,
      "Welcome to our E-commerce Website",
      `Hi, ${username} Thank you for contacting us.`
    );
    await newUser.save();

    res.status(201).json({ message: "Registration Successful" });
  } catch (error) {
    console.error("Error during registration:", error); // Log the actual error
    res.status(500).json({ error: "Registration Failed" });
  }
}
