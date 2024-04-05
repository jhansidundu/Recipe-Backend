import { pool } from "./databasePool.js";

// insert user info to user table
export const insertUser = async (name, email, phoneNumber, password) => {
  const sql =
    "insert into users (name, email, phoneNumber, password) values (?, ?, ?, ?)";
  await pool.query(sql, [name, email, phoneNumber, password]);
  return;
};

// get user by email from user table
export const findUserByEmail = async (email) => {
  const sql = `select id, name, email, phoneNumber, password from users where email=?`;
  const [[user]] = await pool.query(sql, [email]);
  return user;
};

// get userid from user table
export const findUserIdByEmail = async (email) => {
  const sql = `select id from users where email=?`;
  const [[{ id }]] = await pool.query(sql, [email]);
  return id;
};
