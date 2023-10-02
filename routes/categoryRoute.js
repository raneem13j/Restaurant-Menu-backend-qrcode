import express from "express";
import { adminAuth } from "../config/auth.js";


const router = express.Router();

import {
    getAllCategories,
    createCategory,
  
    
} from "../controllers/categoryController.js";


router.get('/', getAllCategories);
router.post('/',adminAuth, createCategory);


export default router