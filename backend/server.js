import express from "express";
import bodyParser from "body-parser";
import { connectToDatabase } from "./config/dbConn.js";
import estatesRouter from "./routes/estates.js";
import Estates from "./models/Estates.js";
import axios from "axios";
const PORT = process.env.PORT || 5000;

async function fetchData() {
  const url =
    "https://www.sreality.cz/api/cs/v2/estates?category_main_cb=1&category_type_cb=1&page=0&per_page=500";
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const estates = response.data._embedded.estates;
      // Save data using Sequelize
      for (const estate of estates) {
        const name = estate.name;
        const id = estate.hash_id;
        const images = estate._links.images || [];
        try {
          await Estates.create({
            id,
            title: name,
            imageURLs: images,
          });
          console.log(`Saved data for ${name}`);
        } catch (error) {
          console.error(`Error saving data for ${name}:`, error);
        }
      }
    } else {
      console.error("Failed to fetch the page");
    }
  } catch (error) {
    console.error("Error fetching data from the API:", error);
  }
}

const app = express();
connectToDatabase();
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://www.localhost:3000");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

fetchData();
app.use("/estate", estatesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.get("/api/estates", (req, res) => {
//   const page = parseInt(req.query.page) || 0;
//   const perPage = parseInt(req.query.perPage) || 2;
//   const startIndex = (page - 1) * perPage;
//   // Replace this with your logic to fetch projects based on the 'page' value
//   // For now, let's just send back a dummy response
//   const projects = [
//     { id: 1, name: "Project 1" },
//     { id: 2, name: "Project 2" },
//     // Add more project data here
//   ];

//   // Return the projects as JSON
//   res.json(projects);
// });
