import { insertBookmark } from "../db/bookmark.js";
import { allbookmark } from "../db/bookmark.js";
import axios from "axios";
export const addBookmark = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { recipeId } = req.body;
    await insertBookmark(userId, recipeId);
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getAllBookmarks = (req, res, next) => {
  try {
    const id = req.user.id;
    const response = allbookmark(id);
    if (!response) {
      throw new Error("no liked recipes");
    }
  } catch (err) {
    next(err);
  }
};
