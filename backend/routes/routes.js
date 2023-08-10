//------------IMPORT-----------------------------------------------------------------------//
import {
    getAllTransactions, 
    getOneTransaction, 
    createOneTransaction, 
    updateOneTransaction, 
    deleteOneTransaction} from '../controllers/transactionCtrl.js';

import {Router} from 'express';

import {getAllUsers,
        getOneUser, 
        createUser, 
        updateUser, 
        deleteUser} from '../controllers/userCtrl.js';

import {createOneBudget,
        getOneBudget,
        updateOneBudget,
        deleteOneBudget,
        getAllBudgets} from '../controllers/budgetCtrl.js';

import {login} from '../controllers/auth/authController.js';
//------------------------------------------------------------------------------------------------//


//Créer une nouvelle instance de Router Express
const router = Router();



//-------------ROUTES TRANSACTIONS--------------------------------------------------------//


// Permet de voir toutes les transactions
router.get('/transaction/getAll', getAllTransactions);

// Cette route permet de consulter une transaction.
router.get('/transaction/GetOne/:id', getOneTransaction);

// Cette route permet de créer une nouvelle transaction.
router.post('/transaction/create', createOneTransaction);

//Le paramètre :id est un paramètre dynamique qui correspond à l'ID de la transaction à mettre à jour.
router.put('/transaction/update/:id', updateOneTransaction);

//Le paramètre :id est un paramètre dynamique qui correspond à l'ID de la transaction à supprimer.
router.delete('/transaction/delete/:id', deleteOneTransaction);


//-------------ROUTES USER--------------------------------------------------------//

//Route qui permet de consulter toutes les utilisateurs.
router.get('/users/getAll', getAllUsers);

//Route qui permet de consulter un utilisateur.
router.get('/users/getOne/:id', getOneUser);

//Roite qui permet de créer un utilisateur.
router.post('/users/create', createUser);

//Route qui permet de mettre à jour un utilisateur.
router.put('/users/update/:id', updateUser);

//Route qui permet de supprimer un utilisateur.
router.delete('/user/delete/:id', deleteUser);


//---------------ROUTES BUDGET--------------------------------------------------------//
//Route pour créer un budget.
router.post('/budget/create', createOneBudget);

//Route qui permet de consulter le budget d'un utilisateur.
router.get('/budget/getOne/:id', getOneBudget);

//Route qui permet de modifier le budget d'un utilisateur.
router.put('/budget/update/:id', updateOneBudget);

//Router qui permet de supprimer le budget d'un utilisateur.
router.delete('/budget/delete/:id', deleteOneBudget);

//Route qui permet de consulter tous les budgets.
router.get('/budget/getAll', getAllBudgets);



//-------------ROUTES AUTH--------------------------------------------------------//
//Route qui permet d'authentifier un utilisateur.
router.post('/login', login);

export default router;