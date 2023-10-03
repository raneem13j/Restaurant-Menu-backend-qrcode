import Product from "../models/productModel.js";

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const createProduct = async (req, res) => {
  try {
    console.log("sdasfas")
    console.log(req.body.categoryId)
    const newProduct = new Product({
      product: req.body.product,
      price: req.body.price,
      categoryId: req.body.categoryId,
    });
   
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updatePrice = async (req, res) => {
  try {
    const productId = req.params.id;
    const newPrice = req.body.price;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { price: newPrice },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
