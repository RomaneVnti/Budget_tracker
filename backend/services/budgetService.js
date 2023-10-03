import Budget from '../models/budget.js'; 
import Category from '../models/category.js'; 
import { Op } from 'sequelize'; 

// Définition du service de gestion de budgets
const budgetService = {
    // Fonction pour obtenir tous les budgets
    getAllBudgets: async () => {
        try {
            const budgets = await Budget.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            return budgets;
        } catch (err) {
            throw err;
        }
    },

    // Fonction pour créer un nouveau budget
    createOneBudget: async (budgetData) => {
        try {
            const newBudget = await Budget.create(budgetData);
            return newBudget;
        } catch (err) {
            throw err;
        }
    },

    // Fonction pour obtenir tous les budgets d'un utilisateur
    getAllBudgetsForUser: async (userId) => {
        try {
            //console.log("Fetching budgets for user:", userId);
            const budgets = await Budget.findAll({
                where: { user_id: userId }
            });
            //console.log("Budgets for user:", budgets);
            return budgets;
        } catch (error) {
            //console.error("Error fetching budgets:", error); 
            throw error;
        }
    },

    // Fonction pour obtenir un budget par catégorie et utilisateur
    getBudgetByCategoryAndUser: async (categoryId, userId) => {
        try {
            const budget = await Budget.findOne({
                where: { category_id: categoryId, user_id: userId }
            });
            return budget;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour mettre à jour un budget par catégorie et utilisateur
    updateBudgetForCategoryAndUser: async (categoryId, userId, updatedBudgetData) => {
      try {
    // Obtenez le budget du mois en cours pour la catégorie spécifiée
    const currentMonthBudget = await Budget.findOne({
      where: {
        category_id: categoryId,
        user_id: userId,
        // spécifier la période de budget pour le mois en cours
        [Op.and]: [
          {
            budget_period_start: {
              [Op.lte]: updatedBudgetData.budget_period_start,
            },
          },
          {
            budget_period_end: {
              [Op.gte]: updatedBudgetData.budget_period_end,
            },
          },
        ],
      },
    });

    if (!currentMonthBudget) {
      throw new Error('Budget du mois en cours introuvable');
    }

    // Mise à jour des propriétés du budget avec les nouvelles données
    currentMonthBudget.budget_amount = updatedBudgetData.budget_amount;

    // Sauvegarde du budget mis à jour
    await currentMonthBudget.save();
    return currentMonthBudget;
  } catch (error) {
    throw error;
  }
},

    getBudgetByCategoryUserAndMonth: async (categoryId, userId, budgetStartDate) => {
      try {
        //console.log('Début de la recherche du budget...'); 
        const budget = await Budget.findOne({
          where: {
            category_id: categoryId,
            user_id: userId,
            budget_period_start: budgetStartDate,
          },
        });
    
        if (budget) {
          //console.log('Budget trouvé :', budget); 
        } else {
          //console.log('Aucun budget trouvé.'); 
        }
    
        return budget;
      } catch (error) {
        //console.error('Erreur lors de la recherche du budget :', error); 
        throw error;
      }
    },
    
    

    // Fonction pour obtenir le budget mensuel total pour un utilisateur
    getTotalMonthlyBudgetForUser: async (userId) => {
      try {
        // Obtention de tous les budgets de l'utilisateur
        const budgets = await budgetService.getAllBudgetsForUser(userId);
    
        // Créez un objet pour stocker les derniers budgets de chaque catégorie
        const lastBudgetsByCategory = {};
    
        // Triez les budgets par date de fin de budget (budget_period_end) pour chaque catégorie
        for (const budget of budgets) {
          try {
            // Obtenez la catégorie associée au budget
            const category = await Category.findByPk(budget.category_id);
            if (category) {
              // Si la catégorie n'existe pas dans lastBudgetsByCategory, on l'ajoute
              if (!lastBudgetsByCategory[category.categoryName]) {
                lastBudgetsByCategory[category.categoryName] = budget;
              } else {
                // Si un budget précédent existe, comparez les dates et gardez le plus récent
                if (new Date(budget.budget_period_end) > new Date(lastBudgetsByCategory[category.categoryName].budget_period_end)) {
                  lastBudgetsByCategory[category.categoryName] = budget;
                }
              }
            }
          } catch (error) {
            //console.error("Error while fetching category:", error);
          }
        }
    
        // Obtenez la date actuelle
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
    
        // Filtrer les budgets pour ne prendre en compte que le mois en cours
        const budgetsOfCurrentMonth = Object.values(lastBudgetsByCategory).filter((budget) => {
          const startDate = new Date(budget.budget_period_start);
          const budgetMonth = startDate.getMonth() + 1;
          const budgetYear = startDate.getFullYear();
    
          return budgetMonth === currentMonth && budgetYear === currentYear;
        });
    
        // Calcul du budget total mensuel en additionnant les montants des derniers budgets de chaque catégorie
        const totalMonthlyBudget = budgetsOfCurrentMonth.reduce((total, budget) => {
          return total + budget.budget_amount;
        }, 0);
    
        // Retour du budget total mensuel et des derniers budgets de chaque catégorie
        return { totalMonthlyBudget, categoryLastBudgets: lastBudgetsByCategory };
      } catch (error) {
        //console.error("Error in getTotalMonthlyBudgetForUser:", error); 
        throw error;
      }
    },

      getAllCategories: async () => {
        try {
          const categories = await Category.findAll();
          //console.log('Categories data from getAllCategories:', categories); 
          return categories;
        } catch (error) {
          //console.error('Error in getAllCategories:', error); 
          throw error;
        }
      }
};

export default budgetService;
