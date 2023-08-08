
//importe le module Router depuis express
import {getAllTransactions, getOneTransaction, createOneTransaction, updateOneTransaction, deleteOneTransaction} from '../controllers/transactionCtrl.js';
import {Router} from 'express';
import {getAllUsers, getOneUser, createUser, updateUser, deleteUser} from '../controllers/userCtrl.js';

//Créer une nouvelle instance de Router Express
const router = Router();

//-------------ROUTES TRANSACTIONS--------------------------------------------------------//


// Permet de voir toutes les transactions
router.get('/getAllTransactions', getAllTransactions);

// Cette route permet de consulter une transaction.
router.get('/getOneTransaction/:id', getOneTransaction);

// Cette route permet de créer une nouvelle transaction.
router.post('/createOneTransaction', createOneTransaction);

//Le paramètre :id est un paramètre dynamique qui correspond à l'ID de la transaction à mettre à jour.
router.put('/updateOneTransaction/:id', updateOneTransaction);

//Le paramètre :id est un paramètre dynamique qui correspond à l'ID de la transaction à supprimer.
router.delete('/deleteOneTransaction/:id', deleteOneTransaction);


//-------------ROUTES USER--------------------------------------------------------//

//Route qui permet de consulter toutes les utilisateurs.
router.get('/getAllUsers', getAllUsers);

//Route qui permet de consulter un utilisateur.
router.get('/getOneUser/:id', getOneUser);

//Roite qui permet de créer un utilisateur.
router.post('/createUser', createUser);

//Route qui permet de mettre à jour un utilisateur.
router.put('/updateUser/:id', updateUser);

//Route qui permet de supprimer un utilisateur.
router.delete('/deleteUser/:id', deleteUser);


export default router;