// routes.js (ou similaire)
import transactionRoutes from './transactionRoutes.js';
import authRoutes from './authRoutes.js';
import budgetRoutes from './budgetRoutes.js';
import userRoutes from './userRoutes.js';

import { Router } from 'express';
import {validateInputs, authenticate } from '../middleware/authMiddleware.js';

const router = Router();


// Montez les routes liées aux utilisateurs sur le chemin '/users'
router.use('/users', userRoutes);

// Montez les routes liées aux transactions sur le chemin '/transaction'
router.use('/transaction', authenticate, transactionRoutes);

// Montez les routes d'authentification sur le chemin '/login'
router.use('/login', validateInputs, authRoutes);

// Montez les routes de gestion de budgets sur le chemin '/budget'
router.use('/budget', authenticate, budgetRoutes);





export default router;