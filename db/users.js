import { pool } from "./databasePool.js";

export const insertUser = async (name, email, phoneNumber, password) => {
  const sql =
    "insert into users (name,email,phoneNumber,password) values (?,?,?,?)";
  await pool.query(sql, [name, email, phoneNumber, password]);
  return;
};

export const getNamebyEmail = async (email) => {
  const sql =
    "select id,name,email,phoneNumber,password from users where email = ?";
  const res = await pool.query(sql, [email]);
  return res;
};

export const getIdbyEmail = async (email) => {
  const sql = "select id from users where email = ?";
  const res = await pool.query(sql, [email]);
  return res;
};
