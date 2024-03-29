import routes from "./routes/index.js";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { notFound, errorHandler } from "./util/middleware.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);
app.listen(5000, () => {
  console.log("server started");
});
