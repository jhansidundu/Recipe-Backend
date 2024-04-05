import bcrypt from "bcrypt";
import { findUserIdByEmail, findUserByEmail, insertUser } from "../db/users.js";
import { createPasswordHash } from "../util/cryptUtil.js";
import { generateAccessToken } from "../util/jwtUtil.js";
import {
  validateEmail,
  validateMobileNumber,
  validatePassword,
} from "../util/validations.js";
// User registration
export const signup = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;
    const isEmailValid = validateEmail(email); /*email validation */
    const isPassValid = validatePassword(password); /*Validate password */
    const isMobileValid =
      validateMobileNumber(phoneNumber); /* validate mobile number*/

    if (!(isEmailValid && isPassValid && isMobileValid)) {
      res.status(400);
      throw new Error("Invalid input");
    }
    //  Find wheather user already exist or not
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      res.status(400);
      throw new Error(
        "Email already exists"
      ); /*error message if user already exist*/
    }

    //  generate hashpassword with user password using bcrytp library
    const encryptedPassword = await createPasswordHash(password);

    // insert user information into user table
    await insertUser(name, email, phoneNumber, encryptedPassword);

    // get user information through email
    const userId = findUserIdByEmail(email);
    const user = {
      id: userId,
      name,
      email,
    };

    // generate accesstoken with user info
    const accessToken = generateAccessToken(user);
    return res.json({
      success: true,
      message: "Signed up successfully",
      data: { accessToken, email, name },
    });
  } catch (e) {
    next(e);
  }
};

//  function for user login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check wheather user exist or not
    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(400);
      throw new Error("Invalid credentials");
    }

    if (existingUser) {
      const hashedPassword = existingUser.password;

      // compare login password with his existing password
      const validation = await bcrypt.compare(password, hashedPassword);

      // if password true
      if (validation) {
        const { id, name, email } = existingUser;
        const user = {
          id,
          name,
          email,
        };

        // generate access token
        const accessToken = generateAccessToken(user);

        //  send response
        return res.json({
          success: true,
          data: { accessToken, email, name },
        });
      } else {
        res.status(400);
        throw new Error(
          "Invalid Credentials"
        ); /* throw error credentials not valid*/
      }
    }
    res.send({ success: true });
  } catch (e) {
    next(e);
  }
};

//  validate token --- for every feature access, checking right user or not --- */
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
