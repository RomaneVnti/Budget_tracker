import transactionRoutes from './transactionRoutes.js';
import authRoutes from './authRoutes.js';
import budgetRoutes from './budgetRoutes.js';
import userRoutes from './userRoutes.js';
import { Router } from 'express';
import { validateInputs, authenticate } from '../middleware/authMiddleware.js';

// Création d'un nouvel objet de routeur Express
const router = Router();

// Montage des différentes routes sur les chemins correspondants

// routes liées aux utilisateurs sur le chemin '/users'
router.use('/users', userRoutes);

//routes liées aux transactions sur le chemin '/transaction'
// L'authentification est requise pour accéder à ces routes
router.use('/transaction', authenticate, transactionRoutes);

//routes d'authentification sur le chemin '/login'
// La validation des entrées est effectuée avant d'accéder à ces routes
router.use('/login', validateInputs, authRoutes);

//routes de gestion de budgets sur le chemin '/budget'
// L'authentification est requise pour accéder à ces routes
router.use('/budget', authenticate, budgetRoutes);

export default router;
