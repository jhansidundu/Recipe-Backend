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
    const { query, offset = 0, number = 10 } = req.query;
    console.log(query);
    const recipes = await axios.get(
      `${SPOONACULAR_API_URL}/complexSearch?apiKey=${API_KEY}&query=${query}&offset=${offset}&number=${number}`
    );
    return res.json({ success: true, data: recipes.data });
  } catch (err) {
    next(err);
  }
};
