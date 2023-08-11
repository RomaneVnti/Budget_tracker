import {Router} from 'express';
import {login} from '../controllers/auth/authController.js';

const authRouter = Router();

authRouter.post('/login', login);

export default authRouter;