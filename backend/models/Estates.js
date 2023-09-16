import DataTypes from "sequelize";
import { sequelize } from "../config/dbConn.js";

const Estates = sequelize.define(
  "Estates",
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    imageURLs: {
      type: DataTypes.STRING(5000),
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "Estates",
  }
);

// Ensure the table is created
Estates.sync()
  .then(() => {
    console.log("Estates table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create Estates table:", error);
  });

export default Estates;
