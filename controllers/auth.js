import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//REGISTER USER

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name.trim()) {
      return res.json({ error: "Name is required" });
    }

    if (!email.trim()) {
      return res.json({ error: "Email is required" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({
      name,
      email,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    res.json({
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

//LOGIN USER
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email.trim()) {
      return res.json({ error: "Email is required" });
    }
    if (!password.trim()) {
      return res.json({ error: "Password is required" });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.json({ error: "User Does not  exists" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.json({ error: "Password is incorrect" });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Successfully logged in",
      token,
      name: existingUser.name,
      email: existingUser.email,
      role: existingUser.role,
    });
  } catch (error) {
    console.log(error);
  }
};
