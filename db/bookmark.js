import { pool } from "./databasePool.js";

export const insertBookmark = async (userId, recipeId) => {
  const sql = " insert into bookMark (userId,recipeId) values (?,?) ";
  await pool.query(sql, [userId, recipeId]);
  return;
};

export const getAllFavourite = async (userId) => {
  const sql = "select recipeId from bookMark where userId = ?";
  const res = await pool.query(sql, [userId]);
  return res;
};

export const deleteRecipeFromFav = async (userId, recipeId) => {
  const sql = "delete from bookMark where userId = ? and recipeId = ?";
  await pool.query(sql, [userId, recipeId]);
};
