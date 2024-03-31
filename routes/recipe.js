import express from "express";
import {
  getPopularRecipes,
  getSearchedRecipes,
} from "../controllers/recipe.js";
const router = express.Router();

router.get("/popular", getPopularRecipes);
router.get("/search", getSearchedRecipes);
export default router;
