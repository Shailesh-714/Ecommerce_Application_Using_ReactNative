const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");
require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// MongoDB Connection
mongoose.connect(
  "mongodb+srv://shailesh:7104@reactive-native-app.tgklloh.mongodb.net/?retryWrites=true&w=majority&appName=reactive-native-app",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));

// User Model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  age: { type: String },
  addresses: [
    {
      address: String,
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
    },
  ],
});
const User = mongoose.model("User", UserSchema);

//nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "expoapp.shailesh@gmail.com",
    pass: "gebxecmflthluqjv",
  },
});

// Routes
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(401).send("Email already exists");
    const verificationCode = randomstring.generate({
      length: 6,
      charset: "numeric",
    });
    const mailOptions = {
      from: "expoapp.shailesh@gmail.com",
      to: email,
      subject: "Email Verification Code",
      text: `Your verification code is: ${verificationCode}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error sending email");
      } else {
        console.log("Email sent: " + info.response);
        res.send("Verification code sent successfully");
      }
    });
    res.json({ verificationCode });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

app.post("/email-verify", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber: "",
      age: "",
    });
    await newUser.save();
    res.status(201).send("User verified");
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("Invalid credentials");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).send("Invalid credentials");
    const token = jwt.sign(
      { id: user._id },
      "2YUzfn1cCAhktOLd4JT8r0QEKSBseolXvpaF3PujyHg6qD57mW9IMVRZixGbNw"
    );
    const username = user.name;
    const userEmail = user.email;
    res.json({
      token,
      username,
      userEmail,
      phoneNumber: user.phoneNumber,
      age: user.age,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.post("/update-user-data", async (req, res) => {
  try {
    const { email, name, phoneNumber, age } = req.body;
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { name: name, phoneNumber: phoneNumber, age: age },
      { new: true }
    );
    if (!updatedUser) {
      res.status(401).send("User Not Found");
    }
    res.status(201).send("User Updated");
  } catch (err) {
    console.error(err);
  }
});

app.post("/addAddress", async (req, res) => {
  try {
    const { email, newAddress } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send("User Not Found");
    }
    user.addresses.push(newAddress);
    res.status(201).send("Address added");
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
