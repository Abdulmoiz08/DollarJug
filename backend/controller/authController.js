const User = require("../model/User");
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/sendEmail");
const generateToken = require("../utils/generateJwtToken");

const registerUser = async (req, res) => {
  
  const { name, email, password, role } = req.body;

  try {
    // check existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exists" });
    }
     // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    // user data
    const userData = {
      name,
      email,
      password: hashedpassword,
      role,
    };
    // if file is send then this code is run otherwise default value of profile pic is loaded
    if (req.file) {
      userData.profilePic = req.file.path;
    }
   
    //create new user
    const newUser = await User.create(userData);

    if (newUser) {
      // create otp
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const message = ` welcome to dollarjug ,${name} thank you for registering. Your OTP is ${otp}`;
      // call nodemailer to send mail to the user registered
      await sendEmail(email, "OTP for registration", message);
      //generate jwt token
      const token = generateToken(newUser._id);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        token,
        role: newUser.role,
        profilePic: newUser.profilePic,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateToken(user._id);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
        profilePic: user.profilePic,
      });
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

module.exports = { registerUser, loginUser, getUsers };
