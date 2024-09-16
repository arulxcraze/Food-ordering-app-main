import express from "express"
import {displayUser, loginUser,registerUser} from "../controllers/userController.js"
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register",registerUser)
userRouter.post("/login",loginUser)
userRouter.post("/display",authMiddleware,displayUser)

export default userRouter;