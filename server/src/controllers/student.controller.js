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
    console.log(error);
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
    if (access_token) {
      return res.status(200).json(
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
    }
    throw new Error("Unable to generate Access token");
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError("500", "Something went wrong", error).toJSON());
  }
};

export const add_student_marks = async (req, res) => {
  try {
    const { standard, remarks, percentage } = req.body;
    const { studentId } = req.user;
    const studentDetails = await Student.findById(studentId);
    if (!studentDetails) {
      return res
        .status(404)
        .json(new ApiError(404, "Student not found").toJSON());
    }
    // Ensure the `standard` is less than the student's `currentStandard`
    if (standard >= studentDetails.currentStandard) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            `Standard must be less than the current standard (${studentDetails.currentStandard}).`
          ).toJSON()
        );
    }
    const existingDetail = studentDetails.previousDetails.find(
      (detail) => detail.standard === Number(standard)
    );
    if (existingDetail) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            `Cannot add results for the same standard 2 times. Please update the previous details.`
          ).toJSON()
        );
    }
    // Add the new previous details to the array
    studentDetails.previousDetails.push({ standard, remarks, percentage });

    // Save the updated student document
    await studentDetails.save();

    // Respond with success
    return res.status(201).json(
      new ApiResponse(201, "Previous details added successfully", {
        studentId,
        previousDetails: studentDetails.previousDetails,
      }).toJSON()
    );
  } catch (error) {
    console.error("Error adding previous details:", error);
    return res.status(500).json(
      new ApiError(500, "An error occurred while adding previous details", {
        error: error.message,
      }).toJSON()
    );
  }
};

export const get_student_marks = async (req, res) => {
  try {
    const { studentId } = req.user;
    const studentDetails = await Student.findById(studentId);
    if (!studentDetails) {
      return res
        .status(404)
        .json(new ApiError(404, "Student not found").toJSON());
    }
    return res.status(200).json(
      new ApiResponse(200, "Students details fetched successfully", {
        studentDetails,
      }).toJSON()
    );
  } catch (error) {
    console.error("Error fetching student details:", error);
    return res.status(500).json(
      new ApiError(500, "An error occurred while fetching details", {
        error: error.message,
      }).toJSON()
    );
  }
};
export const update_student_marks = async (req, res) => {
  try {
    const { standard, remarks, percentage } = req.body;
    const { studentId } = req.user;
    const studentDetails = await Student.findById(studentId);
    if (!studentDetails) {
      return res
        .status(404)
        .json(new ApiError(404, "Student not found").toJSON());
    }
    // Find the details from the
    if (standard >= studentDetails.currentStandard) {
      return res
        .status(400)
        .json(
          new ApiError(
            400,
            `Standard must be less than the current standard (${studentDetails.currentStandard}).`
          ).toJSON()
        );
    }
    // Find if the standard already exists in previousDetails
    console.log(standard);
    const existingDetail = studentDetails.previousDetails.find(
      (detail) => detail.standard === Number(standard)
    );
    console.log(existingDetail);
    if (existingDetail) {
      // Update existing details
      existingDetail.remarks = remarks;
      existingDetail.percentage = percentage;
    } else {
      // Add new previous detail
      studentDetails.previousDetails.push({ standard, remarks, percentage });
    }

    // Save the updated student document
    await studentDetails.save();

    // Respond with success
    return res.status(200).json(
      new ApiResponse(200, "Previous details updated successfully", {
        studentId,
        previousDetails: studentDetails.previousDetails,
      }).toJSON()
    );
  } catch (error) {
    console.error("Error adding previous details:", error);
    return res.status(500).json(
      new ApiError(500, "An error occurred while adding previous details", {
        error: error.message,
      }).toJSON()
    );
  }
};
