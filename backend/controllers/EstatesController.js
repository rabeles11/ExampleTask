import Estates from "../models/Estates.js";

export const getAllEstatesPaginated = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 10;

    const totalEstatesCount = await Estates.count();

    const hasMore = totalEstatesCount > page * perPage;

    const offset = (page - 1) * perPage;

    const estates = await Estates.findAll({
      limit: perPage,
      offset: offset,
      order: [["createdAt", "DESC"]],
    });

    const responseObj = { estates, hasMore };

    res.json(responseObj);
  } catch (error) {
    console.error("Error fetching estates:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
