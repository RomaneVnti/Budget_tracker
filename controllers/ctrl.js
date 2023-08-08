import transactionValidation from "../validation/transactionValidation.js";
import Transaction from "../models/transaction.js";


const getAllTransactions = () => {};
const getOneTransaction = () => {};

//--------------------------------------------------------------------------------------------------------------------------------
//Methode POST
const createOneTransaction = (req, res) => {
    //La fonction récupère le corps de la requête
    const {body} = req;
    //Vérifie que le corps de la requête est valide
    const {error} = transactionValidation(body);
    if(error) return res.status(400).json({error: error.details[0].message});

    //Crée une nouvelle transaction
    Transaction.create({...body})
    .then(() => {
        res.status(201).json({message: 'Transaction created successfully'});
    })
    .catch(error => res.status(500).json(error));

};

const updateOneTransaction = () => {};
const deleteOneTransaction = () => {};

export {getAllTransactions, getOneTransaction, createOneTransaction, updateOneTransaction, deleteOneTransaction};