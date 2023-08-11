import {Router} from 'express';
import budgetCtrl from '../controllers/budgetCtrl.js'

const budgetRouter = Router();

budgetRouter.post('/create', budgetCtrl.createOneBudget);
budgetRouter.put('/update/:id', budgetCtrl.updateOneBudget);
budgetRouter.get('/getOne:id', budgetCtrl.getOneBudget);
budgetRouter.delete('/delete/:id', budgetCtrl.deleteOneBudget);
budgetRouter.get('/getAll', budgetCtrl.getAllBudgets);

export default budgetRouter;