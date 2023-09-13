import express from "express";
import fetch from "node-fetch";
import { pgUser, pgHost, pgDatabase, pgPassword, pgPort } from "./keys.js";
import axios from "axios";
import cheerio from "cheerio";
import pg from "pg";
const { Pool } = pg;

const app = express();

const pgClient = new Pool({
  user: pgUser,
  host: pgHost,
  database: pgDatabase,
  password: pgPassword,
  port: pgPort,
});

async function fetchData() {
  try {
    await pgClient.query(
      "CREATE TABLE IF NOT EXISTS SRealityData (title TEXT, imageURL TEXT)"
    );
  } catch (error) {
    console.error("Error occurred while executing the query:", error);
  }

  const url = "https://www.sreality.cz/hledani/prodej/byty?strana=";
  const response = await axios.get(url);
  if (response.status === 200) {
    const html = response.data;
    console.log(html);
    const $ = cheerio.load(html);
    console.log($);
    // Use the specific class to target the desired element
    const apartmentInfo = $(".name.ng-binding").text();
    console.log(apartmentInfo);
  } else {
    res.status(500).json({ error: "Failed to fetch the page" });
  }
}

app.get("/scrape", async (req, res) => {
  try {
    const url = "https://www.sreality.cz/en/search/for-sale/apartments?page=2";
    const response = await axios.get(url);

    if (response.status === 200) {
      const html = response.data;
      const $ = cheerio.load(html);
      console.log($);
      // Use the specific class to target the desired element
      const apartmentInfo = $(".name.ng-binding").text();

      res.json({ apartmentInfo });
    } else {
      res.status(500).json({ error: "Failed to fetch the page" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred while scraping" });
  }
});

app.get("/", (req, res) => {
  res.send(`Hello world`);
});

app.listen(5000, () => {
  console.log("Server up on port 5000");
  fetchData();
});
