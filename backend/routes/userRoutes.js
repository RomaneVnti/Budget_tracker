import {Router} from 'express';
import userCtrl  from '../controllers/userCtrl.js';

const userRouter = Router();

userRouter.post('/', userCtrl.createUser);
userRouter.put('/:id', userCtrl.updateUser);
userRouter.get('/:id', userCtrl.getOneUser);
userRouter.delete('/:id', userCtrl.deleteUser);
userRouter.get('/', userCtrl.getAllUsers);

export default userRouter;