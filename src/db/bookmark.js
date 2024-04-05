import { pool } from "./databasePool.js";

export const insertBookmark = async (userId, recipeId) => {
  const sql = `insert into bookmark (userId, recipeId) values (?, ?)`;
  await pool.query(sql, [userId, recipeId]);
  return;
};

// get all bookmark recipes from bookmark table with userid
export const findAllBookmarksByUserId = async (userId) => {
  const sql = `select recipeId from bookmark where userId=?`;
  const [results] = await pool.query(sql, [userId]);
  return results;
};

// remove recipe from boookmark table
export const deleteBookmark = async (userId, recipeId) => {
  const sql = `delete from bookmark where userId=? and recipeId=?`;
  const res = await pool.query(sql, [userId, recipeId]);
};

// check whether recipe is in book or not
export const checkIfAlreadyBookmarked = async (userId, recipeId) => {
  const sql = `SELECT * FROM bookmark where userId=? and recipeId=?`;
  const [bookmarks] = await pool.query(sql, [userId, recipeId]);
  if (bookmarks.length > 0) {
    return true;
  }
  return false;
};
