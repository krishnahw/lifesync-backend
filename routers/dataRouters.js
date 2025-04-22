import express from 'express';
import { addData, getData, getUserData } from '../controller/dataController.js';
import upload from '../models/multer.js';
import { login, registerUser } from '../controller/authController.js';
import verifyToken from '../middleware/verifyToken.js';


const router = express.Router();

router.post("/upload",verifyToken, upload.single('image'),addData );

router.get("/allData", getData)

router.get("/userData", verifyToken, getUserData);

router.post("/register", registerUser);

router.get('/login', login);

export default router;