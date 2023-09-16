import express from "express";
import bodyParser from "body-parser";
import { connectToDatabase } from "./config/dbConn.js";
import estatesRouter from "./routes/estates.js";
import Estates from "./models/Estates.js";
import axios from "axios";
import fetchData from "./scripts/ScrapeAllEstates.js";
const PORT = process.env.PORT || 5000;

const app = express();
connectToDatabase();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://www.localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use("/estate", estatesRouter);

fetchData();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
