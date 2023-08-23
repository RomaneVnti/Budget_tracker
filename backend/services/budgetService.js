import Budget from '../models/budget.js';
import Category from '../models/category.js';


const budgetService = {
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


    createOneBudget: async (budgetData) => {
        try {
            const newBudget = await Budget.create(budgetData);
            return newBudget;
        } catch (err) {
            throw err;
        }
    },

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

    updateBudgetForCategoryAndUser: async (categoryId, userId, budgetData) => {
        try {
            const existingBudget = await Budget.findOne({
                where: { category_id: categoryId, user_id: userId }
            });

            if (!existingBudget) {
                throw new Error('Budget not found');
            }

            existingBudget.budget_amount = budgetData.budget_amount;
            existingBudget.budget_period_start = budgetData.budget_period_start;
            existingBudget.budget_period_end = budgetData.budget_period_end;

            await existingBudget.save();
            return existingBudget;
        } catch (error) {
            throw error;
        }
    },

    getTotalMonthlyBudgetForUser: async (userId) => {
        try {
            const budgets = await budgetService.getAllBudgetsForUser(userId);

            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const currentYear = currentDate.getFullYear();

            const budgetsOfCurrentMonth = budgets.filter(budget => {
                const startDate = new Date(budget.budget_period_start);
                const budgetMonth = startDate.getMonth() + 1;
                const budgetYear = startDate.getFullYear();
                return budgetMonth === currentMonth && budgetYear === currentYear;
            });

            const categoryLastBudgets = {};
            for (const budget of budgetsOfCurrentMonth) {
                try {
                    const category = await Category.findByPk(budget.category_id);
                    if (category) {
                        if (!categoryLastBudgets[category.categoryName] || budget.budget_period_end > categoryLastBudgets[category.categoryName].budget_period_end) {
                            categoryLastBudgets[category.categoryName] = budget;
                        }
                    }
                } catch (error) {
                    console.error("Error while fetching category:", error);
                }
            }

            const totalMonthlyBudget = Object.values(categoryLastBudgets).reduce((total, budget) => {
                return total + budget.budget_amount;
            }, 0);

            return { totalMonthlyBudget, categoryLastBudgets };
        } catch (error) {
            throw error;
        }
    },
};

export default budgetService;
