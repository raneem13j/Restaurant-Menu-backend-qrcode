import mongoose from "mongoose";
const { Schema, model } = mongoose;

const menuSchema = new Schema(
  {
    menu: {
      type: String,
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'Please include the product category'],
      },
    ],
  },
  { timestamps: true },
 
  );
  
const Menu = model("Menu", menuSchema);
export default Menu;
