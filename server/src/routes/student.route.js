import { Router } from "express";
import {
  signinMiddleware,
  signupMiddleware,
} from "../middlewares/student.middlewares.js";
import {
  validatePrevMarksSchema,
  validateSignupSchema,
} from "../middlewares/schemaValidations.js";
import {
  signup_controller,
  signin_controller,
  add_student_marks,
  get_student_marks,
  update_student_marks,
} from "../controllers/student.controller.js";
import { verifyAccessToken } from "../utils/helperFunctions.js";

const studentRouter = Router();

studentRouter.post(
  "/register",
  validateSignupSchema,
  signupMiddleware,
  signup_controller
);
studentRouter.post("/login", signinMiddleware, signin_controller);
studentRouter.post("/logout");

studentRouter.post(
  "/prevdetails",
  validatePrevMarksSchema,
  verifyAccessToken,
  add_student_marks
);
studentRouter.get("/prevdetails", verifyAccessToken, get_student_marks);
studentRouter.put(
  "/prevdetails",
  validatePrevMarksSchema,
  verifyAccessToken,
  update_student_marks
);

export default studentRouter;
