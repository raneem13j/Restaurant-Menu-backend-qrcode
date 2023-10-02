import express from "express";


const router = express.Router();

import {
    signup,
    login,
    logout,
    activateUser,
    getAllUser
} from "../controllers/userController.js";


router.get('/', getAllUser);
router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);
router.post('/activate/:id', activateUser);


export default router