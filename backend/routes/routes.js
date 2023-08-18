//------------IMPORT-----------------------------------------------------------------------//
import transactionRoutes from './transactionRoutes.js'; 
import authRoutes from './authRoutes.js'; 
import budgetRoutes from './budgetRoutes.js'; 
import userRoutes from './userRoutes.js'; 
import {Router} from 'express';



//------------------------------------------------------------------------------------------------//


//Créer une nouvelle instance de Router Express
const router = Router();



router.use('/transaction', transactionRoutes);
router.use('/login', authRoutes);
router.use('/budget', budgetRoutes);
router.use('/users', userRoutes);


export default router;