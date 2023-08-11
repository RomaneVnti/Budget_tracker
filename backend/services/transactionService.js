import Transaction from '../models/transaction.js';

const transactionService = {
    getAllTransactions: async () => {
        try {
            const transactions = await Transaction.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            return transactions;
        } catch (err) {
            throw err;
        }
    },

    getOneTransaction: async (id) => {
        try {
            const transaction = await Transaction.findByPk(id);
            return transaction;
        } catch (err) {
            throw err;
        }
    },

    createOneTransaction: async (transactionData) => {
        try {
            const newTransaction = await Transaction.create(transactionData);
            return newTransaction;
        } catch (err) {
            throw err;
        }
    },

    updateOneTransaction: async (id, transactionData) => {
        try {
            const transaction = await Transaction.findByPk(id);
            if (!transaction) {
                throw new Error('Transaction not found');
            }

            // Mettre à jour les propriétés de la transaction avec les valeurs de transactionData
            transaction.transaction_amount = transactionData.transaction_amount;
            transaction.date = transactionData.date;
            transaction.type_transaction = transactionData.type_transaction;
            transaction.description = transactionData.description;
            transaction.paymentMethod_id = transactionData.paymentMethod_id;
            transaction.category_id = transactionData.category_id;

            await transaction.save();
            return transaction;
        } catch (error) {
            throw error;
        }
    },

    deleteOneTransaction: async (id) => {
        try {
            const rowsDeleted = await Transaction.destroy({ where: { id_transaction: id } });
            if (rowsDeleted === 0) {
                throw new Error('Transaction not found');
            }
            return true;
        } catch (error) {
            throw error;
        }
    }


};


export default transactionService;