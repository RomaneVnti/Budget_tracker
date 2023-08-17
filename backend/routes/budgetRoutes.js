import {Router} from 'express';
import budgetCtrl from '../controllers/budgetCtrl.js'

const budgetRouter = Router();

budgetRouter.post('/', budgetCtrl.createOneBudget);
budgetRouter.put('/:id', budgetCtrl.updateOneBudget);
budgetRouter.get('/:id', budgetCtrl.getOneBudget);
budgetRouter.delete('/:id', budgetCtrl.deleteOneBudget);
budgetRouter.get('/', budgetCtrl.getAllBudgets);

export default budgetRouter;