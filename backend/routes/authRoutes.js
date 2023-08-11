import {Router} from 'express';
import authCtrl from '../controllers/Ctrl.js';

const authRouter = Router();

authRouter.post('/login', authCtrl.login);

export default authRouter;