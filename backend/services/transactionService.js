import Transaction from '../models/transaction.js';
import { Op } from 'sequelize';
import Category from '../models/category.js';

// Définition du service de gestion de transactions
const transactionService = {
    // Fonction pour obtenir toutes les transactions
    getAllExpenseTransactionsForUser: async (userId) => {
        try {
            const today = new Date();
            const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
            const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
        
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
    // Ajoutez cette méthode à votre service transaction
    updateOneTransaction: async (id, transactionData) => {
      try {
        // Recherchez la transaction par son ID
        const transaction = await Transaction.findByPk(id);
    
        if (!transaction) {
          throw new Error('Transaction not found');
        }
    
        // Mettez à jour les propriétés de la transaction avec les nouvelles données
        transaction.transaction_amount = transactionData.transaction_amount;
        transaction.date = transactionData.date;
        transaction.type_transaction = transactionData.type_transaction;
        transaction.description = transactionData.description;
    
        // Avant d'attribuer le category_id à la transaction, recherchez-le dans la table Category
        const category = await Category.findOne({ where: { categoryName: transactionData.categoryName } });
    
        if (!category) {
          throw new Error('Category not found');
        }
    
        transaction.category_id = category.category_id;
    
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
     getUserTransactionHistory : async (userId) => {
        try {
            // Utilisez la méthode findAll de Sequelize pour récupérer les 10 dernières transactions avec la catégorie associée
            const transactions = await Transaction.findAll({
              where: { user_id: userId },
              include: {
                model: Category,
                attributes: ['categoryName'],
                as: 'category',
              },
              order: [['date', 'DESC']], // Triez par date décroissante (plus récente en premier)
            });
        
            // transactions contiendra les 10 dernières transactions de l'utilisateur avec les noms de catégorie
            return transactions;
          } catch (error) {
            throw error;
          }
      }
};

export default transactionService;
