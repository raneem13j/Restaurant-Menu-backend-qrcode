import Menu from "../models/menuModel.js";

export const getAllMenus = async (req, res) => {

    try {
        const menus = await Menu.find();
        res.status(200).json(menus);
      } catch (err) {
        res.status(500).json({ error: err });
      }
  };

  export const createMenu = async (req, res) => {
    try {
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