import { Router } from 'express';
import budgetCtrl from '../controllers/budgetCtrl.js';
import { authenticate } from '../middleware/authMiddleware.js';

// Création d'un nouvel objet de routeur Express
const budgetRouter = Router();

// Définition des routes pour la gestion de budgets

// Route POST pour créer ou mettre à jour un nouveau budget
budgetRouter.post('/createOrUpdateBudget', authenticate, budgetCtrl.createOrUpdateBudget);

// Route GET pour obtenir tous les budgets
budgetRouter.get('/allBudgets/:userId', authenticate, budgetCtrl.getAllBudgets);

// Route GET pour obtenir toutes les catégories de budget
budgetRouter.get('/getCategories', authenticate, budgetCtrl.getAllCategories);

// Route GET pour obtenir le total du budget mensuel pour un ID spécifique
budgetRouter.get('/totalMonthlyBudget/:userId', authenticate, budgetCtrl.getTotalMonthlyBudget);

export default budgetRouter;
