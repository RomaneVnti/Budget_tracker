import budgetService from '../services/budgetService.js';
import BudgetValidation from '../validation/budgetValidation.js';
import Category from '../models/category.js';

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
    },

    getTotalMonthlyBudget: async (req, res) => {
        const { id } = req.params; // Obtenez l'ID de l'utilisateur à partir des paramètres de la requête
    
        try {
            // Récupérez les budgets de l'utilisateur
            const budgets = await budgetService.getAllBudgetsForUser(id);
    
            // Filtrer les budgets pour ne garder que ceux du mois en cours
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // Janvier est 0, donc ajoutez 1 pour obtenir le mois réel
            const currentYear = currentDate.getFullYear();
    
            const budgetsOfCurrentMonth = budgets.filter(budget => {
                const startDate = new Date(budget.budget_period_start);
                const endDate = new Date(budget.budget_period_end);
    
                const budgetMonth = startDate.getMonth() + 1; // Janvier est 0, donc ajoutez 1 pour obtenir le mois réel
                const budgetYear = startDate.getFullYear();
    
                // Vérifiez si le budget appartient au mois en cours et à l'année en cours
                return budgetMonth === currentMonth && budgetYear === currentYear;
            });
    
            // Trouver le dernier budget pour chaque catégorie
            const categoryLastBudgets = {};
            for (const budget of budgetsOfCurrentMonth) {
                const category = await Category.findByPk(budget.category_id);
                if (category) {
                    if (!categoryLastBudgets[category.categoryName] || budget.budget_period_end > categoryLastBudgets[category.categoryName].budget_period_end) {
                        categoryLastBudgets[category.categoryName] = budget;
                    }
                }
            }
    
            // Calculer le budget total mensuel en additionnant les allocations des derniers budgets
            const totalMonthlyBudget = Object.values(categoryLastBudgets).reduce((total, budget) => {
                return total + budget.budget_amount;
            }, 0);
    
            res.status(200).json({ totalMonthlyBudget, categoryLastBudgets });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};


export default budgetCtrl;
