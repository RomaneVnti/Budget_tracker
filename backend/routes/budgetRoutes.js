import { Router } from 'express';
import budgetCtrl from '../controllers/budgetCtrl.js';
import {authenticate} from '../middleware/authMiddleware.js'

// Création d'un nouvel objet de routeur Express
const budgetRouter = Router();

// Définition des routes pour la gestion de budgets

// Route POST pour créer un nouveau budget
budgetRouter.post('/createOrUpdateBudget', authenticate, budgetCtrl.createOrUpdateBudget);

// Route GET pour obtenir tous les budgets
budgetRouter.get('/', authenticate, budgetCtrl.getAllBudgets);

// Route pour récupérer toutes les catégories
budgetRouter.get('/getCategories', authenticate,budgetCtrl.getAllCategories);

// Route GET pour obtenir le total du budget mensuel pour un ID spécifique
budgetRouter.get('/totalMonthlyBudget/:userId', authenticate, budgetCtrl.getTotalMonthlyBudget);


export default budgetRouter;
