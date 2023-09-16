import express from "express";
import bodyParser from "body-parser";
import { connectToDatabase } from "./config/dbConn.js";
import estatesRouter from "./routes/estates.js";
import fetchData from "./scripts/ScrapeAllEstates.js";
const PORT = process.env.PORT || 5000;

const app = express();

async function startServer() {
  try {
    await connectToDatabase();
    app.use(bodyParser.json());

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080");
      res.setHeader("Access-Control-Allow-Headers", "Content-Type");
      res.setHeader("Access-Control-Allow-Credentials", "true");
      next();
    });

    app.use("/estate", estatesRouter);

    fetchData();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
}

startServer();
