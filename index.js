import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import categoryRoutes from "./routes/category.js";
import productRoutes from "./routes/product.js";
import sslCommerzRoutes from "./routes/sslCommerzRoutes.js";

const PORT = process.env.PORT || 5000;

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Backend of Gadget Ecommerce");
});

app.use(authRoutes);
app.use(categoryRoutes);
app.use(productRoutes);
app.use(sslCommerzRoutes);

app.listen(PORT, () => {
  console.log("Listening on port 5000");
});
