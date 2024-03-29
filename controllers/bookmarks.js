import { insertBookmark } from "../db/bookmark.js";

export const addBookmark = async (req, res, next) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.id;
    await insertBookmark(userId, recipeId);
    return res.json({ success: true });
  } catch (e) {
    next(e);
    // res.json({ Error: "error" });
  }
};
