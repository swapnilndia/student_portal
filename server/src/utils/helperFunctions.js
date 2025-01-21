import jwt from "jsonwebtoken";
import brcypt from "bcrypt";
export const isTokenExpired = (expiryTime) => {
  const currentTime = Math.ceil(new Date().getTime() / 1000);
  if (currentTime > expiryTime) {
    return true;
  } else {
    return false;
  }
};

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
