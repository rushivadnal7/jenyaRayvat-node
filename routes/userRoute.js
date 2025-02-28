import express from  'express';
import { login, register } from '../controllers/userController.js';
import { loginRateLimiter } from '../middleware/rateLimiter.js';



const userRouter = express.Router();

userRouter.post('/register' , register);
userRouter.post('/login', loginRateLimiter, login)

export default userRouter;