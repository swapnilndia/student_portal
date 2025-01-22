import jwt from "jsonwebtoken";
import ApiError from "./ApiError.js";

export const generateAccessToken = ({ studentId, email }) => {
  const acces_token_secret = process.env.ACCESS_TOKEN_SECRET_KEY;
  const access_Token = jwt.sign(
    {
      studentId,
      email,
    },
    acces_token_secret,
    {
      expiresIn: 24 * 60 * 60,
    }
  );
  return access_Token;
};

export const isTokenExpired = (expiryTime) => {
  const currentTime = Math.ceil(new Date().getTime() / 1000);
  if (currentTime > expiryTime) {
    return true;
  } else {
    return false;
  }
};

export const verifyAccessToken = async (req, res, next) => {
  const tokenHeader = req.headers["authorization"];
  const accessToken = tokenHeader && tokenHeader.split(" ")[1];
  if (!accessToken) {
    return res
      .status(401)
      .json(new ApiError(401, "Authorization token Missing", {}).toJSON());
  }
  try {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET_KEY;
    const decodedToken = jwt.verify(accessToken, accessTokenSecret);

    req.user = decodedToken;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json(
        new ApiError(401, "Unauthorized Access - Token Expired", {
          accessToken,
        }).toJSON()
      );
    } else if (error.name === "JsonWebTokenError") {
      return res.status(403).json(
        new ApiError(403, "Forbidden Access - Invalid Token", {
          accessToken,
        }).toJSON()
      );
    } else {
      return res
        .status(500)
        .json(new ApiError(500, "Internal Server Error 1").toJSON());
    }
  }
};
