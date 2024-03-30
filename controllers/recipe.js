import axios from "axios";
import { API_KEY, SPOONACULAR_API_URL } from "../util/constants";

export const getPopularRecipes = async (req, res, next) => {
  try {
    const recipes = await axios.get(
      `${SPOONACULAR_API_URL}/random?apiKey=${API_KEY}&number=100`
    );
    return res.json({ success: true, data: recipes.data });
  } catch (err) {
    next(err);
  }
};
