import { deleteBookmark, insertBookmark } from "../db/bookmark.js";

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

export const removeBookmark = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { recipeId } = req.body;
    await deleteBookmark(userId, recipeId);
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const getAllBookmarks = (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
