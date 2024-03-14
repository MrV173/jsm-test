import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Transaction = db.define(
  "transaction",
  {
    customer_money: DataTypes.INTEGER,
    food_price: DataTypes.INTEGER,
    customer_change: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

export default Transaction;

(async () => {
  await db.sync();
})();
