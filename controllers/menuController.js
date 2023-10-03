import Menu from "../models/menuModel.js";
const qr = require('qr-image'); 

export const getAllMenus = async (req, res) => {

    try {
        const menus = await Menu.find()
        .populate({
          path: "products",
          select: "product price categoryId",
          populate: {
              path: "categoryId",
              select: "category" 
          }
      });
        res.status(200).json(menus);
      } catch (err) {
        res.status(500).json({ error: err });
      }
  };
  export const getQRcode = async (req, res) => {
    try {
      const menuId = req.params.id;
      const qrCode = qr.image(`http://localhost:5000/menu/qr/${menuId}`, { type: 'png' });
      res.type('png');
      qrCode.pipe(res);
      
  } catch (error) {
      console.error(error);
      res.status(500).send(error);
  }
  };

  export const getMenuById = async (req, res) => {
    console.log(req.params.id)
    try {
        const id = req.params.id;
        console.log(id);
        const menu = await Menu.findById(id)   .populate({
          path: "products",
          select: "product price categoryId",
          populate: {
              path: "categoryId",
              select: "category" 
          }
      });
        res.status(200).json(menu);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
}



  export const createMenu = async (req, res) => {
    try {
      console.log("sdasfas");
      console.log(req.body.products);
      console.log(req.body.categories);
      const { menu, products, categories } = req.body;
  
      // Ensure that products and categories are arrays
      const productsArray = Array.isArray(products) ? products : [products];
      const categoriesArray = Array.isArray(categories) ? categories : [categories];
  
      const newMenu = new Menu({
        menu,
        products: productsArray,
        categories: categoriesArray, 
      });
  
      
      await newMenu.save();
  
      res.status(201).json(newMenu);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

 