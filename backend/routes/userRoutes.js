import {Router} from 'express';
import {
    createUser,
    updateUser,
    getOneUser,
    deleteUser,
    getAllUsers
} from '../controllers/userCtrl.js';

const userRouter = Router();

userRouter.post('/create', createUser);
userRouter.put('/update/:id', updateUser);
userRouter.get('/getOne:id', getOneUser);
userRouter.delete('/delete/:id', deleteUser);
userRouter.get('/getAll', getAllUsers);

export default userRouter;