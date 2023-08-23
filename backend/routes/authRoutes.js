import { Router } from 'express';
import authCtrl from '../controllers/authCtrl.js';

import { validateInputs, authenticate} from '../middleware/authMiddleware.js';

// Création d'un nouvel objet de routeur Express
const authRouter = Router();

// Définition de la route POST pour le chemin '/'
// Cette route gère le processus de connexion de l'utilisateur
authRouter.post('/', validateInputs, authenticate, authCtrl.login);

// Exportation de l'objet de routeur authRouter
export default authRouter;
