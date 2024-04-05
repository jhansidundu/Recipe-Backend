import {
  deleteBookmark,
  insertBookmark,
  findAllBookmarksByUserId,
  checkIfAlreadyBookmarked,
} from "../db/bookmark.js";
import axios from "axios";
import { API_KEY, SPOONACULAR_API_URL } from "../util/constants.js";

// add liked recipe to bookmark table
export const addBookmark = async (req, res, next) => {
  try {
    const { id: userId } = req.user;
    const { recipeId } = req.body;
    const alreadyExists = await checkIfAlreadyBookmarked(userId, recipeId);

    // if recipe is not in bookmark
    if (!alreadyExists) {
      await insertBookmark(userId, recipeId);
    }
    return res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

// remove recipe from bookmark
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

// getting all bookmarks
export const getAllBookmarks = async (req, res, next) => {
  try {
    const id = req.user.id;
    let bookmarkIds = await findAllBookmarksByUserId(id);

    if (!bookmarkIds) {
      bookmarkIds = [];
    }

    // getting all bookmarked recipes ids
    const recipeIds = bookmarkIds.map((bm) => bm.recipeId).join(",");

    // gettings all bookmark recipes
    const bookmarks = (
      await axios.get(
        `${SPOONACULAR_API_URL}/informationBulk?apiKey=${API_KEY}&ids=${recipeIds}`
      )
    ).data;
    return res.json({ success: true, data: bookmarks });
  } catch (err) {
    next(err);
  }
};
