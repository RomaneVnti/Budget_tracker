import transactionRoutes from './transactionRoutes.js'; 
import authRoutes from './authRoutes.js'; 
import budgetRoutes from './budgetRoutes.js'; 
import userRoutes from './userRoutes.js'; 
import { Router } from 'express';

// Créer une nouvelle instance de Router Express
const router = Router();


// Montage des routes liées aux transactions sur le chemin '/transaction'
router.use('/transaction', transactionRoutes);

// Montage des routes d'authentification sur le chemin '/login'
router.use('/login', authRoutes);

// Montage des routes de gestion de budgets sur le chemin '/budget'
router.use('/budget', budgetRoutes);

// Montage des routes liées aux utilisateurs sur le chemin '/users'
router.use('/users', userRoutes);

export default router;
