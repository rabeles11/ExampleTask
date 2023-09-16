import express from "express";
import { getAllEstatesPaginated } from "../controllers/EstatesController.js";

const estatesRouter = express.Router();

estatesRouter.route("/").get(getAllEstatesPaginated);

export default estatesRouter;
