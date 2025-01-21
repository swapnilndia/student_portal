import { Router } from "express";
import {
  signinMiddleware,
  signupMiddleware,
} from "../middlewares/student.middlewares.js";
import { validateSignupSchema } from "../middlewares/schemaValidations.js";
import {
  signup_controller,
  signin_controller,
} from "../controllers/student.controller.js";

const studentRouter = Router();

studentRouter.post(
  "/register",
  validateSignupSchema,
  signupMiddleware,
  signup_controller
);
studentRouter.post("/login", signinMiddleware, signin_controller);
studentRouter.post("/logout");

studentRouter.post("/prevdetails");
studentRouter.get("/prevdetails");
studentRouter.put("/prevdetails");

export default studentRouter;
