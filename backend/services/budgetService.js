import Budget from '../models/budget.js';

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

    getOneBudget: async (id) => {
        try {
            const budget = await Budget.findByPk(id);
            return budget;
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

    updateOneBudget: async (id, budgetData) => {
        try {
            const budget = await Budget.findByPk(id);
            if (!budget) {
                throw new Error('Budget not found');
            }

            budget.budget_amount = budgetData.budget_amount;
            budget.budget_period_start = budgetData.budget_period_start;
            budget.budget_period_end = budgetData.budget_period_end;
            budget.category_id = budgetData.category_id;
            budget.user_id = budgetData.user_id;

            await budget.save();
            return budget;
        } catch (error) {
            throw error;
        }
    },

    deleteOneBudget: async (id) => {
        try {
            const rowsDeleted = await Budget.destroy({ where: { budget_id: id } });
            if (rowsDeleted === 0) {
                throw new Error('Budget not found');
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default budgetService;
