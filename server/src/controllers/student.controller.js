import { generateAccessToken } from "../utils/helperFunctions.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Student from "../models/student.model.js";
import bcrypt from "bcrypt";

export const signup_controller = async (req, res) => {
  const { name, email, rollNumber, currentStandard, password } = req.body;
  try {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    const createUser = await Student.create({
      email,
      name,
      rollNumber,
      currentStandard,
      password: hashedPassword,
    });
    if (!createUser) {
      return res.status(400).json(
        new ApiError(400, "Unable to process request at this time", {
          name,
          email,
          rollNumber,
          currentStandard,
          password,
        }).toJSON()
      );
    }

    return res
      .status(201)
      .json(
        new ApiResponse(201, "User successfully Signed Up", createUser).toJSON()
      );
  } catch (error) {
    return res
      .status(500)
      .json(
        new ApiError(
          "500",
          "Internal server error",
          "Something went wrong",
          error
        ).toJSON()
      );
  }
};

export const signin_controller = async (req, res) => {
  const { email } = req.body;
  console.log(req.user);
  const { _id, currentStandard } = req.user;
  try {
    const access_token = generateAccessToken({ studentId: _id, email });
    res.status(200).json(
      new ApiResponse(
        200,
        "User successfully logged in",
        {
          studentId: _id,
          currentStandard,
          access_token,
        },
        null
      ).toJSON()
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError("500", "Something went wrong", error).toJSON());
  }
};
