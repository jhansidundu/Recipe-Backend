import express from "express";
import { addBookmark, getAllBookmarks } from "../controllers/bookmark.js";
import { validateAccessToken } from "../util/middleware.js";

const router = express.Router();

router.get("/", validateAccessToken, getAllBookmarks);
router.post("/add", validateAccessToken, addBookmark);

export default router;
