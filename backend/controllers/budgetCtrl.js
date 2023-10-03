import budgetService from '../services/budgetService.js';
import BudgetValidation from '../validation/budgetValidation.js'; 

// Contrôleur de gestion des budgets
const budgetCtrl = {
    // Méthode pour créer ou mettre à jour un budget
    createOrUpdateBudget: async (req, res) => {
        try {
            const { body } = req; // Extrait le corps de la requête

            const { error } = BudgetValidation(body); // Valide le corps de la requête avec la fonction BudgetValidation
            if (error) {
                return res.status(400).json({ error: error.details[0].message }); 
            }

            // Obtient l'ID, date actuelle, mois actuel et l'année
            const userId = req.user.user_id; 
            const currentDate = new Date(); 
            const currentMonth = currentDate.getMonth() + 1; 
            const currentYear = currentDate.getFullYear(); 

            // Calcul de la date du dernier jour du mois en cours
            const lastDayOfMonth = new Date(currentYear, currentMonth, 0);

            // fonction getBudgetByCategoryUserAndMonth pour récupérer le budget existant
            const existingBudget = await budgetService.getBudgetByCategoryUserAndMonth(
                body.category_id,
                userId,
                body.budget_period_start
            );

            if (existingBudget) {
                // Si un budget existe, mettre à jour ce budget 
                existingBudget.budget_amount = body.budget_amount;

                // fonction updateBudgetForCategoryAndUser pour mettre à jour le budget existant
                await budgetService.updateBudgetForCategoryAndUser(
                    body.category_id,
                    userId,
                    existingBudget
                );
                res.status(200).json({ message: 'Budget crée avec succès' });
            } else {
                // Si aucun budget n'existe, créez-en un nouveau pour le mois en cours
                body.user_id = userId;
                body.budget_period_start = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-01`; // Définit la date de début du budget
                body.budget_period_end = `${currentYear}-${currentMonth.toString().padStart(2, '0')}-${lastDayOfMonth.getDate()}`; // Définit la date de fin du budget

                await budgetService.createOneBudget(body); // Crée un nouveau budget
                res.status(201).json({ message: 'Budget crée avec succès' }); 
            }
        } catch (error) {
            // console.error("Error in create/update budget:", error); // Journalise l'erreur
            res.status(500).json({ error: "Une erreur est survenue lors de la création et l'update du budget" }); 
        }
    },

    // Méthode pour obtenir tous les budgets
    getAllBudgets: async (req, res) => {
        try {
            // Récupérez tous les budgets en utilisant le service budgetService
            const budgets = await budgetService.getAllBudgets();
            res.status(200).json(budgets); // Répond avec la liste de tous les budgets
        } catch (error) {
            // console.error("Error in getAllBudgets:", error); 
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération du budget" }); 
        }
    },

    // Méthode pour obtenir le total mensuel du budget de l'utilisateur
    getTotalMonthlyBudget: async (req, res) => {
        try {
            // Obtenir l'ID de l'utilisateur connecté
            const userId = req.user.user_id;

            // Obtenir les informations sur le total mensuel du budget de l'utilisateur
            const totalBudgetInfo = await budgetService.getTotalMonthlyBudgetForUser(userId);

            res.status(200).json(totalBudgetInfo); 
        } catch (error) {
            // console.error("Error in getTotalMonthlyBudget:", error); 
            res.status(500).json({ error: "Une erreur est survenue lors du calcul du budget total" }); 
        }
    },

    // Méthode pour obtenir toutes les catégories
    getAllCategories: async (req, res) => {
        try {
            const categories = await budgetService.getAllCategories(); // Récupère toutes les catégories
            res.status(200).json(categories); // Répond avec la liste de toutes les catégories
        } catch (error) {
            // console.error('Erreur lors de la récupération des catégories :', error);
            res.status(500).json({ error: 'Une erreur est survenu lors de la récupération des catégories' }); 
        }
    }
};

export default budgetCtrl;
