import mongoose from "mongoose";
const { Schema, model } = mongoose;

const productSchema = new Schema(
  {
    product: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: [true, "Please include the price"],
    },
    categoryId: {
        type: Schema.Types.ObjectId,
        ref: "Category",
        required: [true, "Please include the product category"],
      }
  },
  { timestamps: true },
 
  );
  
const Product = model("Product", productSchema);
export default Product;
