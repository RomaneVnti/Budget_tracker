import { Router } from 'express';
import transactionCtrl from '../controllers/transactionCtrl.js';

const transactionRouter = Router();

transactionRouter.get('/getAll', transactionCtrl.getAllTransactions);
transactionRouter.get('/getOne/:id', transactionCtrl.getOneTransaction);
transactionRouter.post('/create', transactionCtrl.createOneTransaction);
transactionRouter.put('/update/:id', transactionCtrl.updateOneTransaction);
transactionRouter.delete('/delete/:id', transactionCtrl.deleteOneTransaction);

export default transactionRouter;
