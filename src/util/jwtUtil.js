import jwt from "jsonwebtoken";

// generating jwt token encapsulating user information
export const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "12h",
  });
};
