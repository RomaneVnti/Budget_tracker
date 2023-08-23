import transactionValidation from "../validation/transactionValidation.js";
import transactionService from "../services/transactionService.js";


const transactionCtrl = {

    createOneTransaction: async (req, res) => {
        const { body } = req;
        const { error } = transactionValidation(body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const newTransaction = await transactionService.createOneTransaction(body);
            res.status(201).json({ message: 'Transaction created successfully', data: newTransaction });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    updateOneTransaction: async (req, res) => {
        const { body, params: { id } } = req;
        const { error } = transactionValidation(body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            const updatedTransaction = await transactionService.updateOneTransaction(id, body);
            res.status(200).json({ message: 'Transaction updated successfully', data: updatedTransaction });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getAllTransactions: async (req, res) => {
        const { id } = req.params;

        try {
            const transactions = await transactionService.getAllTransactions();
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getOneTransaction: async (req, res) => {
        const { id } = req.params;
        try {
            const transaction = await transactionService.getOneTransaction(id);
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    deleteOneTransaction: async (req, res) => {
        const { id } = req.params;
        try {
            const success = await transactionService.deleteOneTransaction(id);
            if (!success) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            res.status(500).json(error);
        }
    },

    getUserTransactionHistory: async (req, res) => {
        const { id: userId } = req.params;

        try {
            const transactions = await transactionService.getUserTransactionHistory(userId);
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

export default transactionCtrl;