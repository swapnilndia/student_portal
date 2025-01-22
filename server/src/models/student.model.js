import mongoose from "mongoose";
import { Schema } from "mongoose";

const prevDetailsSchema = new Schema({
  standard: {
    type: Number,
    required: true,
    default: null,
  },
  remarks: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
    min: [0, "Percentage cannot be less than 0, instead found {VALUE}"],
    max: [100, "Percentage cannot exceed 100, instead found {VALUE}"],
  },
});

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is a required field"],
    },
    email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: true,
    },
    rollNumber: {
      type: String,
      required: [
        true,
        "Roll Number is a required field, please enter your unique roll-number",
      ],
    },
    currentStandard: {
      type: Number,
      required: [true, "Current Standard is a required field"],
      min: [1, "Standard cannot be less than 1, instead got {VALUE} "],
      max: [12, "Standard cannot be more than 12, instead got {VALUE}"],
    },
    password: {
      type: String,
      required: [true, "Password is a required field"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    previousDetails: {
      type: [prevDetailsSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Student = mongoose.model("student", studentSchema);

export default Student;
