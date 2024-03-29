import { pool } from "./databasePool.js";

export const insertUser = async (name, email, phoneNumber, password) => {
  const sql =
    "insert into users (name,email,phoneNumber,password) values (?,?,?,?)";
  await pool.query(sql, [name, email, phoneNumber, password]);
};

export const getNamebyEmail = async (email) => {
  const sql =
    "select name,email,phoneNumber,password from users where email = ?";
  const res = await pool.query(sql, [email]);
  return res;
};
