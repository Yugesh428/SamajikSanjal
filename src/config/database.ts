import { Sequelize } from "sequelize-typescript";
import { User } from "../models/User";

const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  database: process.env.DB_NAME ,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "",
  logging: false,
  models: [User],
});

export const connectDB = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("✅  Database connection established.");

    // sync({ alter: true }) updates columns without dropping the table.
    // Switch to sync({ force: true }) only in development to drop & recreate.
    await sequelize.sync({ alter: true });
    console.log("✅  Database synced.");
  } catch (error) {
    console.error("❌  Unable to connect to the database:", error);
    process.exit(1);
  }
};

export default sequelize;
