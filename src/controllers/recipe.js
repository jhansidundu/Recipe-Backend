import axios from "axios";
import { API_KEY, SPOONACULAR_API_URL } from "../util/constants.js";

export const getPopularRecipes = async (_, res, next) => {
  try {
    const recipes = await axios.get(
      `${SPOONACULAR_API_URL}/random?apiKey=${API_KEY}&number=100`
    );
    return res.json({ success: true, data: recipes.data });
  } catch (err) {
    next(err);
  }
};

export const getSearchedRecipes = async (req, res, next) => {
  try {
    const {
      query,
      offset = 0,
      number = 10,
      type,
      cuisine,
      diet,
      intolerances,
    } = req.query;

    const recipes = await axios.get(
      `${SPOONACULAR_API_URL}/complexSearch?apiKey=${API_KEY}${
        !!query ? "&query=" + query : ""
      }&offset=${offset}&number=${number}&${!!type ? "&type=" + type : ""}${
        !!cuisine ? "&cuisine=" + cuisine : ""
      }${!!diet ? "&diet=" + diet : ""}${
        !!intolerances ? "&intolerances=" + intolerances : ""
      }`
    );
    return res.json({ success: true, data: recipes.data });
  } catch (err) {
    next(err);
  }
};

export const getRecipeDetails = async (req, res, next) => {
  try {
    const { recipeId } = req.params;
    const response = await axios.get(
      `${SPOONACULAR_API_URL}/${recipeId}/information?includeNutrition=true&apiKey=${API_KEY}`
    );
    const details = response.data;
    res.json({ success: true, data: details });
  } catch (err) {
    next(err);
  }
};
