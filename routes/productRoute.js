import express from "express";
import { adminAuth } from "../config/auth.js";


const router = express.Router();

import {
    getAllProduct,
    createProduct,
    updatePrice,
    
} from "../controllers/productController.js";


router.get('/', getAllProduct);
router.post('/', createProduct);
router.put('/:id', updatePrice);



export default router