// Importation du module Router depuis Express.js
import { Router } from 'express';
import userCtrl from '../controllers/userCtrl.js';
import { authenticate } from '../middleware/authMiddleware.js';

// Création d'un nouvel objet de routeur Express
const userRouter = Router();


// Route POST pour créer un nouvel utilisateur
userRouter.post('/', authenticate,userCtrl.createUser);

// Route PUT pour mettre à jour un utilisateur existant par son ID
userRouter.put('/:id', authenticate,userCtrl.updateUser);

// Route GET pour obtenir un utilisateur spécifique par son ID
userRouter.get('/:id', authenticate,userCtrl.getOneUser);

// Route DELETE pour supprimer un utilisateur par son ID
userRouter.delete('/:id', authenticate,userCtrl.deleteUser);

// Route GET pour obtenir tous les utilisateurs
userRouter.get('/', authenticate,userCtrl.getAllUsers);

export default userRouter;
