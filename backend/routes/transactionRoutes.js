import { Router } from 'express';
import transactionCtrl from '../controllers/transactionCtrl.js';

const transactionRouter = Router();

transactionRouter.get('/', transactionCtrl.getAllTransactions);
transactionRouter.get('/:id', transactionCtrl.getOneTransaction);
transactionRouter.get('/history/:id', transactionCtrl.getUserTransactionHistory);

transactionRouter.post('/', transactionCtrl.createOneTransaction);
transactionRouter.put('/:id', transactionCtrl.updateOneTransaction);
transactionRouter.delete('/:id', transactionCtrl.deleteOneTransaction);


export default transactionRouter;
