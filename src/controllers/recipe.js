import axios from "axios";
import { API_KEY, SPOONACULAR_API_URL } from "../util/constants.js";

// get 100 popular recipes
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

// getting search recipes
export const getSearchedRecipes = async (req, res, next) => {
  try {
    const {
      query,
      offset = 0,
      number = 50,
      type,
      cuisine,
      diet,
      intolerances,
    } = req.body;
    let url = `${SPOONACULAR_API_URL}/complexSearch?apiKey=${API_KEY}`;

    // filters
    if (!!query) {
      url = url + `&query=${query}`;
    }
    if (!!offset) {
      url = url + `&offset=${offset}`;
    }
    if (!!number) {
      url = url + `&number=${number}`;
    }
    if (!!type) {
      url = url + `&type=${type}`;
    }
    if (!!cuisine) {
      url = url + `&cuisine=${cuisine}`;
    }
    if (!!diet) {
      url = url + `&diet=${diet}`;
    }
    if (!!intolerances) {
      url = url + `&intolerances=${intolerances}`;
    }

    console.log(url);
    const recipes = await axios.get(url);
    return res.json({ success: true, data: recipes.data });
  } catch (err) {
    next(err);
  }
};

// get recipe details on clicking recipe
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
