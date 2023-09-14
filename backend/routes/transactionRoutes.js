import { Router } from 'express';
import transactionCtrl from '../controllers/transactionCtrl.js';
import { authenticate } from '../middleware/authMiddleware.js';

// Création d'un nouvel objet de routeur Express
const transactionRouter = Router();


// Route pour obtenir le total des dépenses réelles de l'utilisateur
transactionRouter.get('/totalRealExpenses/:userId', authenticate, transactionCtrl.getAllExpenseTransactions);

// Route GET pour obtenir une transaction spécifique par son ID
transactionRouter.get('/:id',authenticate, transactionCtrl.getOneTransaction);

// Route GET pour obtenir l'historique des transactions d'un utilisateur spécifique par son ID
transactionRouter.get('/history/:id', authenticate, transactionCtrl.getUserTransactionHistory);

// Route POST pour créer une nouvelle transaction
transactionRouter.post('/', authenticate,transactionCtrl.createOneTransaction);

// Route PUT pour mettre à jour une transaction existante par son ID
transactionRouter.put('/:id', authenticate,transactionCtrl.updateOneTransaction);

// Route DELETE pour supprimer une transaction par son ID
transactionRouter.delete('/:id', authenticate,transactionCtrl.deleteOneTransaction);

export default transactionRouter;
