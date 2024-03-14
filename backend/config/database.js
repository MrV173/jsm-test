import { Sequelize } from "sequelize";

const db = new Sequelize("jsm", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
