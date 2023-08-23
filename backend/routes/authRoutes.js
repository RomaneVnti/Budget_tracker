import {Router} from 'express';
import authCtrl from '../controllers/authCtrl.js';
import {validateInputs, authenticate} from '../middleware/authMiddleware.js';


const authRouter = Router();

authRouter.post('/', validateInputs, authenticate, authCtrl.login);
export default authRouter;