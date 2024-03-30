import express from "express";
import bookmarkRoutes from "./bookmark.js";
import userRoutes from "./users.js";
import recipeRoutes from "./recipe.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/bookmark/recipe", bookmarkRoutes);
router.use("/recipe", recipeRoutes);
export default router;
