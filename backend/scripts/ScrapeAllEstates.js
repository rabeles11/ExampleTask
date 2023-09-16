import Estates from "../models/Estates.js";
import axios from "axios";

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

export default fetchData;
