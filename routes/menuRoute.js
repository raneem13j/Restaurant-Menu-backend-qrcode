import express from "express";
import { adminAuth } from "../config/auth.js";

const router = express.Router();

import {
    getAllMenus,
    createMenu,
  
    
} from "../controllers/menuController.js";


router.get('/', getAllMenus);
router.post('/', adminAuth, createMenu);



export default router