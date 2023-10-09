import Transaction from '../models/transaction.js';
import { Op } from 'sequelize';
import Category from '../models/category.js';

const transactionService = {
    // Fonction pour obtenir toutes les transactions de dépense d'un utilisateur ce mois-ci
    getAllExpenseTransactionsForUser: async (userId) => {
        try {
            // Obtient la date actuelle
            const today = new Date();
            // Obtient le premier jour du mois actuel
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            // Obtient le dernier jour du mois actuel
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

            // Recherche toutes les transactions de type "dépense" pour l'utilisateur courant ce mois-ci
            const transactions = await Transaction.findAll({
                where: {
                    user_id: userId,
                    type_transaction: "dépense",
                    date: {
                        [Op.between]: [firstDayOfMonth, lastDayOfMonth],
                    },
                },
                attributes: ['transaction_amount'],
            });

            // Calcule le montant total des dépenses
            const totalExpenseAmount = transactions.reduce(
                (total, transaction) => total + transaction.transaction_amount,
                0
            );

            return totalExpenseAmount;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour obtenir une transaction par son ID
    getOneTransaction: async (id) => {
        try {
            // Recherche la transaction par son ID
            const transaction = await Transaction.findByPk(id);
            return transaction;
        } catch (err) {
            throw err;
        }
    },

    // Fonction pour créer une nouvelle transaction
    createOneTransaction: async (transactionData, userId) => {
        try {
          //console.log('Valeur de transactionData.category_id :', transactionData.category_id);
  
          // Extraire category_id à partir de categoryName
          const category = await Category.findOne({ where: { category_id: transactionData.category_id } });
      
          if (!category) {
            throw new Error('La catégorie spécifiée n\'existe pas.');
          }
      
          // Créez la transaction avec les données mises à jour
          const newTransaction = await Transaction.create({
            user_id: userId,
            transaction_amount: transactionData.transaction_amount,
            description: transactionData.description,
            date: transactionData.date,
            type_transaction: transactionData.type_transaction,
            category_id: category.category_id, // Utilisez category_id extrait
          });
      
          return newTransaction;
        } catch (err) {
          //console.error('Error in createOneTransaction:', err);
      
          if (err.message === 'La catégorie spécifiée n\'existe pas.' || err.message === 'La propriété categoryName est manquante dans transactionData.') {
            throw { status: 400, message: err.message };
          } else {
            throw { status: 500, message: 'Erreur interne du serveur.' };

          }
        }
    },

    // Fonction pour mettre à jour une transaction par son ID
    updateOneTransaction: async (id, transactionData) => {
        try {
            // Recherche la transaction par son ID
            const transaction = await Transaction.findByPk(id);

            if (!transaction) {
                throw new Error('Transaction not found');
            }

            // Met à jour les propriétés de la transaction avec les nouvelles données
            transaction.transaction_amount = transactionData.transaction_amount;
            transaction.date = transactionData.date;
            transaction.type_transaction = transactionData.type_transaction;
            transaction.description = transactionData.description;
            transaction.user_id = transactionData.user_id;
            transaction.category_id = transactionData.category_id;

            // Vérifie la présence de la propriété category_id
            if (!transactionData.category_id) {
                throw new Error('category_id is missing in transactionData.');
            }

            // Utilise directement la valeur de category_id dans la transaction
            transaction.category_id = transactionData.category_id;

            // Sauvegarde la transaction mise à jour
            await transaction.save();

            return transaction;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour supprimer une transaction par son ID
    deleteOneTransaction: async (id) => {
        try {
            // Supprime la transaction par son ID
            const rowsDeleted = await Transaction.destroy({ where: { id_transaction: id } });
            if (rowsDeleted === 0) {
                throw new Error('Transaction not found');
            }
            return true;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour obtenir l'historique des transactions d'un utilisateur avec les catégories associées
    getUserTransactionHistory: async (userId) => {
        try {
            // Utilise la méthode findAll de Sequelize pour récupérer les transactions de l'utilisateur avec les catégories associées
            const transactions = await Transaction.findAll({
                where: { user_id: userId },
                include: {
                    model: Category,
                    attributes: ['categoryName'],
                    as: 'category',
                },
                order: [['date', 'DESC']], // Trie les transactions par date décroissante (plus récente en premier)
            });

            return transactions;
        } catch (error) {
            throw error;
        }
    },
    
};

export default transactionService;
