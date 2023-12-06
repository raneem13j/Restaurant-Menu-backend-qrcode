import express from "express";
import { adminAuth } from "../config/auth.js";

const router = express.Router();

import {
    getAllMenus,
    getQRcode,
    getMenuById,
    createMenu,
  
    
} from "../controllers/menuController.js";


router.get('/', getAllMenus);
router.get('/qrCode/:id', getQRcode);
router.get('/:id',getMenuById);
router.post('/',createMenu);



export default router