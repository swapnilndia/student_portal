import ApiError from "../utils/ApiError.js";
import Student from "../models/student.model.js";
import bcrypt from "bcrypt";

export const signupMiddleware = async (req, res, next) => {
  const { email } = req.body;
  const isExistingUser = await Student.findOne({ email: email });
  if (isExistingUser) {
    return res.status(409).json(
      new ApiError(409, `User with Email:- ${email} already exist`, {
        email,
      }).toJSON()
    );
  }
  next();
};

export const signinMiddleware = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json(
      new ApiError(400, "Email and Password are required fields", {
        email,
        password,
      }).toJSON()
    );
  }
  const isExistingUser = await Student.findOne({ email: email });
  if (!isExistingUser) {
    return res.status(404).json(
      new ApiError(404, `User with Email: ${email} does not exist`, {
        email,
      })
    );
  }
  const hashedPassword = isExistingUser.password;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordCorrect) {
    return res.status(401).json(
      new ApiError(401, "Email or Password does not match", {
        email,
        password,
      }).toJSON()
    );
  }
  req.user = isExistingUser;
  next();
};
