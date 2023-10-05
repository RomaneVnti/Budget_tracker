import Budget from '../models/budget.js'; 
import Category from '../models/category.js'; 
import { Op, Sequelize} from 'sequelize'; 

// Définition du service de gestion de budgets
const budgetService = {
    // Fonction pour obtenir tous les budgets
    // Méthode pour obtenir tous les budgets
getAllBudgetsByUserId: async (userId) => {
  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const budgets = await Budget.findAll({
      where: {
        user_id: userId,
        [Op.and]: [
          Sequelize.where(
            Sequelize.fn('MONTH', Sequelize.col('budget_period_start')),
            currentMonth
          ),
          Sequelize.where(
            Sequelize.fn('YEAR', Sequelize.col('budget_period_start')),
            currentYear
          ),
        ],
      },
      attributes: ['budget_amount'], // Vous pouvez ajouter d'autres attributs si nécessaire
      include: [
        {
          model: Category, // Incluez le modèle Category
          attributes: ['categoryName'], // Sélectionnez les attributs de la catégorie que vous souhaitez inclure
          as: 'category', // Alias pour la relation
        },
      ],
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
        const budgets = await Budget.findAll({
          where: { user_id: userId },
          attributes: ['category_id', 'budget_amount','budget_period_start'], // Sélectionnez uniquement ces colonnes
        });
        return budgets;
      } catch (err) {
        throw err;
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
        console.log('Budgets récupérés :', budgets); // Ajout d'un log pour vérifier les budgets récupérés
    
        // Obtenez la date actuelle
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
    
        // Filtrer les budgets pour ne prendre en compte que le mois en cours
        const budgetsOfCurrentMonth = budgets.filter((budget) => {
          const startDate = new Date(budget.budget_period_start);
          const budgetMonth = startDate.getMonth() + 1;
          const budgetYear = startDate.getFullYear();
    
          console.log('Date de début du budget :', startDate);
          console.log('Mois du budget :', budgetMonth);
          console.log('Année du budget :', budgetYear);
    
          return budgetMonth === currentMonth && budgetYear === currentYear;
        });
        console.log('Budgets du mois en cours :', budgetsOfCurrentMonth); // Ajout d'un log pour vérifier les budgets du mois en cours
    
        // Calcul du budget total mensuel en additionnant les montants des budgets du mois en cours
        const totalMonthlyBudget = budgetsOfCurrentMonth.reduce((total, budget) => {
          return total + budget.budget_amount;
        }, 0);
    
        // Retour du budget total mensuel
        return { totalMonthlyBudget };
      } catch (error) {
        console.error('Erreur dans getTotalMonthlyBudgetForUser :', error);
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
