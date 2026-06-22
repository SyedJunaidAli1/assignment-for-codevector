import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

import productRoutes from "./routes/productRoutes.js";

app.use("/api/products", productRoutes);

export default app;
