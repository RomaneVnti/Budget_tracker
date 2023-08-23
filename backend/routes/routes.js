import transactionRoutes from './transactionRoutes.js'; 
import authRoutes from './authRoutes.js'; 
import budgetRoutes from './budgetRoutes.js'; 
import userRoutes from './userRoutes.js'; 
import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware.js';

// Créer une nouvelle instance de Router Express
const router = Router();


// Montage des routes liées aux transactions sur le chemin '/transaction'
router.use('/transaction',authenticate, transactionRoutes);

// Montage des routes d'authentification sur le chemin '/login'
router.use('/login', authenticate, authRoutes);

// Montage des routes de gestion de budgets sur le chemin '/budget'
router.use('/budget', authenticate, budgetRoutes);

// Montage des routes liées aux utilisateurs sur le chemin '/users'
router.use('/users', authenticate, userRoutes);

export default router;
