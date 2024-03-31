import express from "express";
import {
  addBookmark,
  getAllBookmarks,
  removeBookmark,
} from "../controllers/bookmark.js";
import { validateAccessToken } from "../util/middleware.js";

const router = express.Router();

router.get("/", validateAccessToken, getAllBookmarks);
router.post("/remove", validateAccessToken, removeBookmark);
router.post("/add", validateAccessToken, addBookmark);

export default router;
