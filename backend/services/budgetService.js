// Importations des modèles Budget et Category depuis '../models'
import Budget from '../models/budget.js';
import Category from '../models/category.js';

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
            console.log("Fetching budgets for user:", userId);
            const budgets = await Budget.findAll({
                where: { user_id: userId }
            });
            console.log("Budgets for user:", budgets);
            return budgets;
        } catch (error) {
            console.error("Error fetching budgets:", error);
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
    updateBudgetForCategoryAndUser: async (categoryId, userId, budgetData) => {
        try {
            const existingBudget = await Budget.findOne({
                where: { category_id: categoryId, user_id: userId }
            });

            if (!existingBudget) {
                throw new Error('Budget not found');
            }

            // Mise à jour des propriétés du budget avec les nouvelles données
            existingBudget.budget_amount = budgetData.budget_amount;
            existingBudget.budget_period_start = budgetData.budget_period_start;
            existingBudget.budget_period_end = budgetData.budget_period_end;

            // Sauvegarde du budget mis à jour
            await existingBudget.save();
            return existingBudget;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour obtenir le budget mensuel total pour un utilisateur
    getTotalMonthlyBudgetForUser: async (userId) => {
        try {
            // Obtention de tous les budgets de l'utilisateur
            const budgets = await budgetService.getAllBudgetsForUser(userId);

            // Obtention du mois et de l'année actuels
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();

            // Filtrage des budgets pour le mois et l'année actuels
            const budgetsOfCurrentMonth = budgets.filter(budget => {
                const startDate = new Date(budget.budget_period_start);
                const budgetMonth = startDate.getMonth() + 1;
                const budgetYear = startDate.getFullYear();
                return budgetMonth === currentMonth && budgetYear === currentYear;
            });

            // Création d'un objet pour stocker le dernier budget de chaque catégorie
            const categoryLastBudgets = {};
            for (const budget of budgetsOfCurrentMonth) {
                try {
                    // Obtention de la catégorie associée au budget
                    const category = await Category.findByPk(budget.category_id);
                    if (category) {
                        // Stockage du dernier budget pour chaque catégorie
                        if (!categoryLastBudgets[category.categoryName] || budget.budget_period_end > categoryLastBudgets[category.categoryName].budget_period_end) {
                            categoryLastBudgets[category.categoryName] = budget;
                        }
                    }
                } catch (error) {
                    console.error("Error while fetching category:", error);
                }
            }

            // Calcul du budget total mensuel en additionnant les montants de chaque budget de catégorie
            const totalMonthlyBudget = Object.values(categoryLastBudgets).reduce((total, budget) => {
                return total + budget.budget_amount;
            }, 0);

            // Retour du budget total mensuel et des derniers budgets de chaque catégorie
            return { totalMonthlyBudget, categoryLastBudgets };
        } catch (error) {
            throw error;
        }
    },
};

// Exportation du service de gestion de budgets
export default budgetService;
