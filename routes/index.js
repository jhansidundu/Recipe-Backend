import userRoutes from "./users.js";
import bookmarkRoutes from "./bookmarks.js";
import express from "express";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/liked", bookmarkRoutes);
export default router;
