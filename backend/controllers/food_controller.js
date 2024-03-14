import Food from "../models/food_model.js";
import path from "path";

export const get_all_foods = async (req, res) => {
  try {
    const response = await Food.findAll();
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const get_food_by_id = async (req, res) => {
  try {
    const response = await Food.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const create_food = async (req, res) => {
  if (req.files === null) return res.status(400).json({ msg: "Foto product tidak ada" });
  const name = req.body.name;
  const price = req.body.price;
  const stock = req.body.stock;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];
  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "File tidak diperbolehkan" });
  if (fileSize > 5000000) return res.status(422).json({ msg: "Ukuran foto terlalu besar" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
  });
  try {
    const response = await Food.create({
      name: name,
      price: price,
      stock: stock,
      image: fileName,
      url: url,
    });
    res.status(201).json(response);
  } catch (error) {
    console.log(error.message);
  }
};
