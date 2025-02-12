import ApiError from "../utils/ApiError.js";
import { prevMarksSchema, signupSchema } from "../utils/schema.js";

export const validateSignupSchema = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    res
      .status(400)
      .json(new ApiError(400, "One or more validation error", errors).toJSON());
  }
};
export const validatePrevMarksSchema = async (req, res, next) => {
  try {
    await prevMarksSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    res
      .status(400)
      .json(new ApiError(400, "One or more validation error", errors).toJSON());
  }
};
