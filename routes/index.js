import express from "express";
import bookmarkRoutes from "./bookmark.js";
import userRoutes from "./users.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/recipe/bookmark", bookmarkRoutes);
export default router;
