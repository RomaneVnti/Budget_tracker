
//importe le module Router depuis express
import {getAllTransactions, getOneTransaction, createOneTransaction, updateOneTransaction, deleteOneTransaction} from '../controllers/ctrl.js';
import {Router} from 'express';

//Créer une nouvelle instance de Router Express
const router = Router();

// Permet de voir toutes les transactions
router.get('/getAllTransactions', getAllTransactions);

// Cette route permet de créer une nouvelle transaction.
router.get('/getOneTransaction/:id', getOneTransaction);

// Cette route permet de créer une nouvelle transaction.
router.post('/createOneTransaction', createOneTransaction);

//Le paramètre :id est un paramètre dynamique qui correspond à l'ID de la transaction à mettre à jour.
router.put('/updateOneTransaction/:id', updateOneTransaction);

//Le paramètre :id est un paramètre dynamique qui correspond à l'ID de la transaction à supprimer.
router.delete('/deleteOneTransaction/:id', deleteOneTransaction);

export default router;