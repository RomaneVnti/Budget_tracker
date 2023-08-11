import {Router} from 'express';
import {
    createOneBudget,
    updateOneBudget,
    getOneBudget,
    deleteOneBudget,
    getAllBudgets
} from '../controllers/budgetCtrl.js';

const budgetRouter = Router();

budgetRouter.post('/create', createOneBudget);
budgetRouter.put('/update/:id', updateOneBudget);
budgetRouter.get('/getOne:id', getOneBudget);
budgetRouter.delete('/delete/:id', deleteOneBudget);
budgetRouter.get('/getAll', getAllBudgets);

export default budgetRouter;