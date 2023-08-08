import transactionValidation from "../validation/transactionValidation.js";
import Transaction from "../models/transaction.js";


const getAllTransactions = () => {};
const getOneTransaction = () => {};


const createOneTransaction = (req, res) => {
    const {body} = req;
    const {error} = transactionValidation(body);
    if(error) return res.status(400).json(error.details[0].message);

    Transaction.create({...body})
    .then(() => {
        res.status(201).json({message: 'Transaction created successfully'});
    })
    .catch(error => res.status(500).json(error));

};


const updateOneTransaction = () => {};
const deleteOneTransaction = () => {};

export {getAllTransactions, getOneTransaction, createOneTransaction, updateOneTransaction, deleteOneTransaction};