import express from "express";
import {
  getPopularRecipes,
  getRecipeDetails,
  getSearchedRecipes,
} from "../controllers/recipe.js";
const router = express.Router();

router.get("/popular", getPopularRecipes);
router.post("/search", getSearchedRecipes);
router.get("/:recipeId/details", getRecipeDetails);
export default router;
