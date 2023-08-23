import { Router } from 'express';
import transactionCtrl from '../controllers/transactionCtrl.js';

// Création d'un nouvel objet de routeur Express
const transactionRouter = Router();


// Route GET pour obtenir toutes les transactions
transactionRouter.get('/', transactionCtrl.getAllTransactions);

// Route GET pour obtenir une transaction spécifique par son ID
transactionRouter.get('/:id', transactionCtrl.getOneTransaction);

// Route GET pour obtenir l'historique des transactions d'un utilisateur spécifique par son ID
transactionRouter.get('/history/:id', transactionCtrl.getUserTransactionHistory);

// Route POST pour créer une nouvelle transaction
transactionRouter.post('/', transactionCtrl.createOneTransaction);

// Route PUT pour mettre à jour une transaction existante par son ID
transactionRouter.put('/:id', transactionCtrl.updateOneTransaction);

// Route DELETE pour supprimer une transaction par son ID
transactionRouter.delete('/:id', transactionCtrl.deleteOneTransaction);

export default transactionRouter;
