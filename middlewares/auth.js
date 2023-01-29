import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const requireSignin = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;

    // console.log(req.user.id);

    next();
  } catch (error) {
    res.status(401).json(error);
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.role !== "admin") {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
  }
};
