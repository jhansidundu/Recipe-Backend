import express from "express";
import { getPopularRecipes } from "../controllers/recipe";
const router = express.Router();

router.get("/popular", getPopularRecipes);

export default router;
