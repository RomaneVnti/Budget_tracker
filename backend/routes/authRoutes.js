import {Router} from 'express';
import authCtrl from '../controllers/authCtrl.js';

const authRouter = Router();

authRouter.post('/', authCtrl.login);

export default authRouter;