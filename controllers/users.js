import { pool } from "../db/databasePool.js";
import { insertUser } from "../db/sqlQueries.js";
import { validateEmail } from "../util/validations.js";
import { validatePassword } from "../util/validations.js";
import { validateMobileNumber } from "../util/validations.js";
import { createPasswordHash } from "../util/cryptUtil.js";
import { getNamebyEmail } from "../db/sqlQueries.js";
import { generateAccessToken } from "../util/jwtUtil.js";
import bcrypt from "bcrypt";
export const Signup = async (req, res, next) => {
  try {
    console.log(req.body);
    const { name, email, phoneNumber, password } = req.body;
    const isEmailValid = validateEmail(email);
    const isPassValid = validatePassword(password);
    const isMobileValid = validateMobileNumber(phoneNumber);

    if (!(isEmailValid && isPassValid && isMobileValid)) {
      res.status("400");
      throw new Error("invalid input");
    }
    const encryptedPassword = await createPasswordHash(password);
    await insertUser(name, email, phoneNumber, encryptedPassword);
    return res.json({
      success: true,
      message: "user successfully login",
      email: email,
      name: name,
    });
  } catch (e) {
    next(e);
  }
};

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await getNamebyEmail(email);
    console.log(existingUser);
    if (!existingUser) {
      throw new Error("user not exist");
    }
    if (existingUser) {
      const hashedPassword = existingUser[0][0].password;
      const validation = await bcrypt.compare(password, hashedPassword);
      if (validation) {
        const { name, email, phoneNumber, password } = existingUser[0][0];
        const user = {
          name,
          email,
          phoneNumber,
          password,
        };
        const accessToken = generateAccessToken(user);
        return res.json({
          success: true,
          data: { accessToken },
          email: email,
          name: name,
        });
      } else {
        res.status(400);
        throw new Error("Invalid Credentials");
      }
    }
    res.send({ success: true });
  } catch (e) {
    next(e);
  }
};

export const validateToken = async (req, res, next) => {
  try {
    const user = req.user;
    if (user) {
      return res.json({ success: true });
    } else {
      res.status(401);
      throw new Error("Invalid accessToken ");
    }
  } catch (e) {
    next(e);
  }
};
