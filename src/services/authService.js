const jwt = require("jsonwebtoken");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

class AuthService {
  constructor(userDetails) {
    this.userDetails = userDetails;
  }
  // function for registering user

  async registerUser() {
    const { Name, Email, PhoneNumber, Password } = this.userDetails;

    // checking for duplicate User

    const user = await User.findOne({ Email: Email });
    if (user) {
      throw new Error("User Already Registered");
    }

    const hashedPassword = await bcrypt.hash(Password, 10);

    const userCreated = await User.create({
      Name: Name,
      Email: Email,
      PhoneNumber: PhoneNumber,
      Password: hashedPassword,
    });

    return userCreated;
  }

  async loginUser() {
    const { Email, Password } = this.userDetails;

    // finding the user from email
    const user = await User.findOne({ Email: Email });

    if (!user) {
      throw new Error("User Does Not Registered with this Email");
    }

    // if user found check with the password
    const isPasswordMatch = await bcrypt.compare(Password, user.Password);
    if (!isPasswordMatch) {
      throw new Error("Password Not Match");
    }

    // creating jwt token for login
    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const userData = {
      _id: user._id,
      Name: user.Name,
      Email: user.Email,
      PhoneNumber: user.PhoneNumber,
      Todo:user.Todo,
      Profile:user.Profile
    };

    return { token, userData } ;
  }
}

module.exports = { AuthService };
