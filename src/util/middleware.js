import jwt from "jsonwebtoken";

export const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Not Found - ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (err, _, res, next) => {
  console.log(err);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode);
  return res.json({
    message: err.message,
    success: false,
  });
};
export const validateAccessToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    if (accessToken == null) {
      res.status(401);
      throw new Error("Unauthorized");
    }

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        res.status(401);
        throw new Error("Unauthorized");
      }

      req.user = user;
      next();
    });
  } catch (e) {
    next(e);
  }
};
