import Transaction from "../models/transaction_model.js";
import Food from "../models/food_model.js";

export const transaction = async (req, res) => {
  try {
    const food = await Food.findOne({
      where: {
        id: req.params.food_id,
      },
    });

    const customer_money = req.body.customer_money;

    const customer_change = customer_money - food.price;
    if (customer_money < food.price) {
      return res.status(400).json({ msg: "Maaf nominal yang anda masukan kurang dari harga pesanan. Mohon gunakan nominal yang lebih besar. Terima kasih" });
    }

    const transaction = await Transaction.create({
      customer_money: customer_money,
      food_price: food.price,
      customer_change: customer_change,
    });

    const update_food = {
      stock: food.stock - 1,
      updated_at: new Date(),
    };
    await Food.update(update_food, {
      where: {
        id: req.params.food_id,
      },
    });
    res.status(200).json(transaction);
  } catch (error) {
    console.log(error.message);
  }
};
