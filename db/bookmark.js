import { pool } from "./databasePool.js";

export const insertBookmark = async (userId, recipeId) => {
  const sql = `insert into bookmark (userId, recipeId) values (?, ?)`;
  await pool.query(sql, [userId, recipeId]);
  return;
};

export const findAllBookmarksByUserId = async (userId) => {
  const sql = `select recipeId from bookmark where userId=?`;
  const res = await pool.query(sql, [userId]);
  return res;
};

export const deleteBookmark = async (userId, recipeId) => {
  const sql = `delete from bookmark where userId=? and recipeId=?`;
  await pool.query(sql, [userId, recipeId]);
};

export const allbookmark = async (userId) => {
  const sql = `select recipeId from bookMark where usesrId = ?`;
  const res = await pool.query(sql, [userId]);
  return res;
};
