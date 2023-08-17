import budgetService from '../services/budgetService.js';
import BudgetValidation from '../validation/budgetValidation.js';

const budgetCtrl = {
    createOneBudget: (req, res) => {
        const { body } = req;

        const { error } = BudgetValidation(body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        budgetService.createOneBudget(body)
            .then(() => {
                res.status(201).json({ message: 'Budget created successfully' });
            })
            .catch(error => res.status(500).json({ error: error.message }));
    },

    updateOneBudget: (req, res) => {
        const { body } = req;
        const { id } = req.params;

        const { error } = BudgetValidation(body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        budgetService.updateOneBudget(id, body)
            .then(() => {
                res.status(200).json({ message: 'Budget updated successfully' });
            })
            .catch(error => res.status(500).json({ error: error.message }));
    },

    deleteOneBudget: (req, res) => {
        const { id } = req.params;

        budgetService.deleteOneBudget(id)
            .then(() => res.status(204))
            .catch(error => res.status(500).json({ error: error.message }));
    },

    getOneBudget: (req, res) => {
        const { id } = req.params;

        budgetService.getOneBudget(id)
            .then(budget => res.status(200).json(budget))
            .catch(error => res.status(500).json({ error: error.message }));
    },

    getAllBudgets: (req, res) => {
        budgetService.getAllBudgets()
            .then(budgets => {
                res.status(200).json(budgets);
            })
            .catch(error => res.status(500).json({ error: error.message }));
    }
};

export default budgetCtrl;
