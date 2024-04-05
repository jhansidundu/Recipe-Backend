import express from "express";
import {
  addBookmark,
  alreadyBookmarked,
  getAllBookmarks,
  removeBookmark,
} from "../controllers/bookmark.js";
import { validateAccessToken } from "../util/middleware.js";

const router = express.Router();

router.get("/", validateAccessToken, getAllBookmarks);
router.post("/remove", validateAccessToken, removeBookmark);
router.post("/add", validateAccessToken, addBookmark);
router.get("/:recipeId/check", validateAccessToken, alreadyBookmarked);

export default router;
