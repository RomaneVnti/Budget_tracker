// Importation des modules nécessaires
import transactionValidation from "../validation/transactionValidation.js";
import transactionService from "../services/transactionService.js";

// Définition de l'objet transactionCtrl qui contient les méthodes de contrôle des transactions
const transactionCtrl = {
    // Méthode pour créer une nouvelle transaction
    createOneTransaction: async (req, res) => {
        const { body } = req;
        const { error } = transactionValidation(body); // Validation des données reçues

        if (error) {
            return res.status(400).json({ error: error.details[0].message }); // Erreur de validation
        }

        try {
            const newTransaction = await transactionService.createOneTransaction(body); 
            res.status(201).json({ message: 'Transaction created successfully', data: newTransaction });
        } catch (error) {
            res.status(500).json(error); // Erreur interne du serveur
        }
    },

    // Méthode pour mettre à jour une transaction existante
    updateOneTransaction: async (req, res) => {
        const { body, params: { id } } = req;
        const { error } = transactionValidation(body); // Validation des données reçues

        if (error) {
            return res.status(400).json({ error: error.details[0].message }); // Erreur de validation
        }

        try {
            const updatedTransaction = await transactionService.updateOneTransaction(id, body); 
            res.status(200).json({ message: 'Transaction updated successfully', data: updatedTransaction });
        } catch (error) {
            res.status(500).json(error); // Erreur interne du serveur
        }
    },

    // Méthode pour récupérer toutes les transactions
    getAllTransactions: async (req, res) => {
        try {
            const transactions = await transactionService.getAllTransactions(); 
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json(error); // Erreur interne du serveur
        }
    },

    // Méthode pour récupérer les détails d'une transaction spécifique
    getOneTransaction: async (req, res) => {
        const { id } = req.params;
        try {
            const transaction = await transactionService.getOneTransaction(id); 
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json(transaction);
        } catch (error) {
            res.status(500).json(error); // Erreur interne du serveur
        }
    },

    // Méthode pour supprimer une transaction
    deleteOneTransaction: async (req, res) => {
        const { id } = req.params;
        try {
            const success = await transactionService.deleteOneTransaction(id); 
            if (!success) {
                return res.status(404).json({ message: 'Transaction not found' });
            }
            res.status(200).json({ message: 'Transaction deleted successfully' });
        } catch (error) {
            res.status(500).json(error); // Erreur interne du serveur
        }
    },

    // Méthode pour récupérer l'historique des transactions d'un utilisateur
    getUserTransactionHistory: async (req, res) => {
        const { id: userId } = req.params;
        try {
            const transactions = await transactionService.getUserTransactionHistory(userId); 
            res.status(200).json(transactions);
        } catch (error) {
            res.status(500).json({ error: error.message }); // Erreur interne du serveur
        }
    }
};

export default transactionCtrl;