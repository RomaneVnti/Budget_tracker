import {Router} from 'express';
import {
    getAllTransactions,
    getOneTransaction,
    createOneTransaction,
    updateOneTransaction,
    deleteOneTransaction
} from '../controllers/transactionCtrl.js';

const transactionRouter = Router();

transactionRouter.get('/getAll', getAllTransactions);
transactionRouter.get('/getOne/:id', getOneTransaction);
transactionRouter.post('/create', createOneTransaction);
transactionRouter.put('/update/:id', updateOneTransaction);
transactionRouter.delete('/delete/:id', deleteOneTransaction);

export default transactionRouter;