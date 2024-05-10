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

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

//mongodb
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

//user model
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  age: { type: String },
  addresses: [
    {
      addressUserName: String,
      lane: String,
      street: String,
      city: String,
      state: String,
      country: String,
      postalCode: String,
      contactNumber: String,
    },
  ],
});
const User = mongoose.model("User", UserSchema);

//product model
const productSchema = new mongoose.Schema({
  id: String,
  title: String,
  subtitle: String,
  oldPrice: Number,
  price: Number,
  rating: Number,
  reviews: Number,
  image: {
    uri: String,
  },
  carouselImages: [
    {
      uri: String,
    },
  ],
  description: String,
  wishlisted: Boolean,
  addedtocart: Boolean,
  count: Number,
  category: [String],
});

const Product = mongoose.model("Product", productSchema);

//order model
const orderSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    ref: "User",
    required: true,
    index: true,
  },
  address: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  orderDate: { type: Date, default: Date.now },
  deliveryDate: {
    type: Date,
    default: function () {
      const deliveryDate = new Date();
      deliveryDate.setDate(this.orderDate.getDate() + 7);
      return deliveryDate;
    },
  },
  products: [
    {
      productId: { type: String, required: true },
      productCount: { type: Number, required: true },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);

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
      addresses: user.addresses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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
    await user.save();
    res.json({ addressList: user.addresses });
  } catch (err) {
    console.log(err);
  }
});

app.post("/deleteAddress", async (req, res) => {
  try {
    const { email, _id } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).send("User Not Found");
    }
    const addressDeleted = await User.findOneAndUpdate(
      { email },
      { $pull: { addresses: { _id } } },
      { new: true }
    );
    if (!addressDeleted) {
      res.status(401).send("Address not deleted");
    }
    res.json({ addressList: addressDeleted.addresses });
  } catch (err) {
    console.log(err);
  }
});

app.post("/order", async (req, res) => {
  try {
    const {
      userEmail,
      address,
      totalAmount,
      paymentMethod,
      paymentStatus,
      products,
    } = req.body;
    const newOrder = new Order({
      userEmail,
      address,
      totalAmount,
      paymentMethod,
      paymentStatus,
      products: products,
    });
    console.log(newOrder);
    await newOrder.save();
  } catch (err) {
    console.log(err);
  }
});

app.post("/getOrderDetails", async (req, res) => {
  try {
    const { userEmail } = req.body;
    const orders = await Order.find({ userEmail: userEmail });
    res.json({ orders });
  } catch (err) {
    console.log(err);
  }
});

app.get("/getProducts", async (req, res) => {
  try {
    const productData = await Product.find();
    res.json({ productData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
