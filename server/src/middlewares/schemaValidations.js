import ApiError from "../utils/ApiError.js";
import { signupSchema } from "../utils/schema.js";

export const validateSignupSchema = async (req, res, next) => {
  try {
    await signupSchema.validate(req.body, { abortEarly: false });
    next();
  } catch (error) {
    const errors = error.inner.map((err) => ({
      field: err.path,
      message: err.message,
    }));
    console.log(errors);
    res
      .status(400)
      .json(new ApiError(400, "One or more validation error", errors).toJSON());
  }
};
