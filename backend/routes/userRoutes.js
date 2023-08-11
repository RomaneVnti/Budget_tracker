import {Router} from 'express';
import userCtrl  from '../controllers/userCtrl.js';

const userRouter = Router();

userRouter.post('/create', userCtrl.createUser);
userRouter.put('/update/:id', userCtrl.updateUser);
userRouter.get('/getOne/:id', userCtrl.getOneUser);
userRouter.delete('/delete/:id', userCtrl.deleteUser);
userRouter.get('/getAll', userCtrl.getAllUsers);

export default userRouter;