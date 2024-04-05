import jwt from "jsonwebtoken";

// generate access token

export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "12h",
  });
};
