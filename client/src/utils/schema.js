import * as yup from "yup";
export const signupSchema = yup.object({
  name: yup
    .string()
    .required("Name is required.")
    .min(2, "Name must be at least 2 characters long."),
  email: yup
    .string()
    .required("Email is required.")
    .email("Please enter a valid email address."),
  rollNumber: yup
    .string()
    .required(
      "Roll Number is required. Please provide your unique roll number."
    ),
  currentStandard: yup
    .number()
    .required("Current Standard is required.")
    .min(1, "Standard cannot be less than 1.")
    .max(12, "Standard cannot be greater than 12."),
  password: yup
    .string()
    .required("Password is required.")
    .min(6, "Password must be at least 6 characters long."),
});

export const prevMarksSchema = yup.object({
  standard: yup.number().required("standard is required."),
  remarks: yup.string().required("String is required."),
  percentage: yup
    .number()
    .required()
    .min(0, "Percentage cannot be below 0.")
    .max(100, "Percentage cannot be more than 100."),
});
