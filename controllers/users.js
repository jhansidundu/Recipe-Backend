import bcrypt from "bcrypt";
import { findUserIdByEmail, findUserByEmail, insertUser } from "../db/users.js";
import { createPasswordHash } from "../util/cryptUtil.js";
import { generateAccessToken } from "../util/jwtUtil.js";
import {
  validateEmail,
  validateMobileNumber,
  validatePassword,
} from "../util/validations.js";
export const signup = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const isEmailValid = validateEmail(email);
    const isPassValid = validatePassword(password);
    const isMobileValid = validateMobileNumber(phoneNumber);

    if (!(isEmailValid && isPassValid && isMobileValid)) {
      res.status("400");
      throw new Error("Invalid input");
    }
    const encryptedPassword = await createPasswordHash(password);
    await insertUser(name, email, phoneNumber, encryptedPassword);
    const id = findUserIdByEmail(email);
    return res.json({
      success: true,
      message: "user successfully login",
      email: email,
      name: name,
      id: id[0][0].id,
    });
  } catch (e) {
    next(e);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const existingUser = await findUserByEmail(email);
    console.log(existingUser);

    if (!existingUser) {
      throw new Error("user not exist");
    }
    if (existingUser) {
      const hashedPassword = existingUser[0][0].password;
      const validation = await bcrypt.compare(password, hashedPassword);
      if (validation) {
        const { id, name, email, phoneNumber, password } = existingUser[0][0];
        const user = {
          id,
          name,
          email,
          phoneNumber,
          password,
        };
        const accessToken = generateAccessToken(user);
        return res.json({
          success: true,
          data: { accessToken, email, name },
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
