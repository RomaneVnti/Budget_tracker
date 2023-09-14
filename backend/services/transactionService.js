import Transaction from '../models/transaction.js';

// Définition du service de gestion de transactions
const transactionService = {
    // Fonction pour obtenir toutes les transactions
    getAllExpenseTransactionsForUser: async (userId) => {
        try {
          const transactions = await Transaction.findAll({
            where: {
              user_id: userId, // Filtre par l'ID de l'utilisateur
              type_transaction: "dépense", // Filtre par le type "dépense"
            },
            attributes: { exclude: ['createdAt', 'updatedAt'] },
          });
          return transactions;
        } catch (error) {
          throw error;
        }
      },

    // Fonction pour obtenir une transaction par son ID
    getOneTransaction: async (id) => {
        try {
            const transaction = await Transaction.findByPk(id);
            return transaction;
        } catch (err) {
            throw err;
        }
    },

    // Fonction pour créer une nouvelle transaction
    createOneTransaction: async (transactionData) => {
        try {
            const newTransaction = await Transaction.create(transactionData);
            return newTransaction;
        } catch (err) {
            throw err;
        }
    },

    // Fonction pour mettre à jour une transaction par son ID
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

            // Sauvegarde de la transaction mise à jour
            await transaction.save();
            return transaction;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour supprimer une transaction par son ID
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
    },

    // Fonction pour obtenir l'historique des transactions d'un utilisateur
    getUserTransactionHistory: async (userId) => {
        try {
            console.log("Fetching transactions for user:", userId);
            const transactions = await Transaction.findAll({
                where: { user_id: userId },
            });

            console.log("Transactions for user:", transactions);
            return transactions;
        } catch (error) {
            throw error;
        }
    }
};

export default transactionService;
