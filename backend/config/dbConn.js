import { Sequelize } from "sequelize";
import { pgUser, pgHost, pgDatabase, pgPassword, pgPort } from "../keys.js";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: pgHost,
  port: pgPort,
  database: pgDatabase,
  username: pgUser,
  password: pgPassword,
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    return sequelize;
  } catch (err) {
    console.error("Error connecting to local PostgreSQL:", err);
  }
}

export { sequelize, connectToDatabase };
