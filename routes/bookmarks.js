import { addBookmark } from "../controllers/bookmarks.js";
import express from "express";

const router = express.Router();

router.post("/recipe", addBookmark);

export default router;
