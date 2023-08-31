// Importation du module Router depuis Express.js
import { Router } from 'express';
import userCtrl from '../controllers/userCtrl.js';

// Création d'un nouvel objet de routeur Express
const userRouter = Router();

// Route POST pour créer un nouvel utilisateur (sans authentification)
userRouter.post('/', userCtrl.createUser);

// Route PUT pour mettre à jour un utilisateur existant par son ID
userRouter.put('/:id', userCtrl.updateUser);

// Route GET pour obtenir un utilisateur spécifique par son ID
userRouter.get('/:id', userCtrl.getOneUser);

// Route DELETE pour supprimer un utilisateur par son ID
userRouter.delete('/:id', userCtrl.deleteUser);

// Route GET pour obtenir tous les utilisateurs
userRouter.get('/', userCtrl.getAllUsers);

export default userRouter;
