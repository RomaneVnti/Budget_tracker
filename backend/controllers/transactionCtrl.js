import transactionValidation from "../validation/transactionValidation.js";
import transactionService from "../services/transactionService.js";

const transactionCtrl = {
    // Méthode pour créer une nouvelle transaction
    createOneTransaction: async (req, res) => {
        try {
            const { body } = req;
            const { error } = transactionValidation(body);

            if (error) {
                return res.status(400).json({ error: "Données de transaction non valides" });
            }

            // Crée une nouvelle transaction en utilisant le service transactionService
            const newTransaction = await transactionService.createOneTransaction(body, req.user.user_id);
            
            res.status(201).json({ message: 'Transaction créée avec succès', data: newTransaction });
        } catch (error) {
            //console.error("Erreur lors de la création de la transaction :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la création de la transaction." });
        }
    },

    // Méthode pour mettre à jour une transaction existante
    updateOneTransaction: async (req, res) => {
        try {
            const { body, params: { id } } = req; 
            const { error } = transactionValidation(body); 

            if (error) {
                // Si les données ne sont pas valides, renvoie une réponse d'erreur 400
                return res.status(400).json({ error: "Données de transaction non valides" });
            }

            // Met à jour une transaction existante en utilisant le service transactionService
            const updatedTransaction = await transactionService.updateOneTransaction(id, body);
            
            // Répond avec un message de succès et les données de la transaction mise à jour
            res.status(200).json({ message: 'Transaction mise à jour avec succès', data: updatedTransaction });
        } catch (error) {
            //console.error("Erreur lors de la mise à jour de la transaction :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la mise à jour de la transaction." });
        }
    },

    // Méthode pour récupérer toutes les transactions de dépense
    getAllExpenseTransactions: async (req, res) => {
        try {
            const userId = req.user.user_id;
            
            // Récupère toutes les transactions de dépense pour l'utilisateur en utilisant le service transactionService
            const transactions = await transactionService.getAllExpenseTransactionsForUser(userId);
            
            // Répond avec la liste des transactions de dépense
            res.status(200).json(transactions);
        } catch (error) {
            //console.error("Erreur lors de la récupération des transactions de dépense :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération des transactions de dépense." });
        }
    },

    // Méthode pour récupérer les détails d'une transaction spécifique
    getOneTransaction: async (req, res) => {
        const { id } = req.params; 
        try {
            // Récupère les détails d'une transaction spécifique en utilisant le service transactionService
            const transaction = await transactionService.getOneTransaction(id);
            
            if (!transaction) {
                return res.status(404).json({ message: 'Transaction non trouvée' });
            }
            
            res.status(200).json(transaction);
        } catch (error) {
            //console.error("Erreur lors de la récupération de la transaction :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération de la transaction." });
        }
    },

    // Méthode pour supprimer une transaction
    deleteOneTransaction: async (req, res) => {
        const { id } = req.params; 
        try {
            // Supprime une transaction en utilisant le service transactionService
            const success = await transactionService.deleteOneTransaction(id);
            
            if (!success) {
                return res.status(404).json({ message: 'Transaction non trouvée' });
            }
            
            res.status(200).json({ message: 'Transaction supprimée avec succès' });
        } catch (error) {
            //console.error("Erreur lors de la suppression de la transaction :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la suppression de la transaction." });
        }
    },

    // Méthode pour récupérer l'historique des transactions d'un utilisateur
    getUserTransactionHistory: async (req, res) => {
        const userId = req.user.user_id; 
        try {
            // Récupère l'historique des transactions de l'utilisateur en utilisant le service transactionService
            const transactions = await transactionService.getUserTransactionHistory(userId);
            
            res.status(200).json(transactions);
        } catch (error) {
            //console.error("Erreur lors de la récupération de l'historique des transactions :", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération de l'historique des transactions." });
        }
    }
};

export default transactionCtrl;
