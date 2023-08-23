import { Router } from 'express';
import budgetCtrl from '../controllers/budgetCtrl.js';

// Création d'un nouvel objet de routeur Express
const budgetRouter = Router();

// Définition des routes pour la gestion de budgets

// Route POST pour créer un nouveau budget
budgetRouter.post('/', budgetCtrl.createOneBudget);

// Route GET pour obtenir tous les budgets
budgetRouter.get('/', budgetCtrl.getAllBudgets);

// Route GET pour obtenir le total du budget mensuel pour un ID spécifique
budgetRouter.get('/totalMonthlyBudget/:id', budgetCtrl.getTotalMonthlyBudget);

export default budgetRouter;
