// Importations des modules et services nécessaires
import budgetService from '../services/budgetService.js'; 
import BudgetValidation from '../validation/budgetValidation.js'; 

// Contrôleur de gestion des budgets
const budgetCtrl = {
    // Méthode pour créer ou mettre à jour un budget
    createOneBudget: async (req, res) => {
        const { body } = req; 

        
        const { error } = BudgetValidation(body);
        if (error) {
            // Si des erreurs de validation sont trouvées, renvoyer une réponse avec un code d'erreur 400
            return res.status(400).json({ error: error.details[0].message });
        }

        try {
            // Vérifier si un budget existe déjà pour la catégorie et l'utilisateur spécifiés
            const existingBudget = await budgetService.getBudgetByCategoryAndUser(body.category_id, body.user_id);

            if (existingBudget) {
                // Si un budget existe, mettre à jour le budget existant
                await budgetService.updateBudgetForCategoryAndUser(body.category_id, body.user_id, body);
                res.status(200).json({ message: 'Budget updated successfully' });
            } else {
                // Si aucun budget n'existe, créer-en un nouveau
                await budgetService.createOneBudget(body);
                res.status(201).json({ message: 'Budget created successfully' });
            }
        } catch (error) {
            // Gestion des erreurs lors de la création/mise à jour du budget
            console.error("Error in createOneBudget:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la création/mise à jour du budget." });
        }
    },

    // Méthode pour obtenir tous les budgets
    getAllBudgets: async (req, res) => {
        try {
            // Récupérez tous les budgets en utilisant le service budgetService
            const budgets = await budgetService.getAllBudgets();
            res.status(200).json(budgets);
        } catch (error) {
            // Gestion des erreurs lors de la récupération des budgets
            console.error("Error in getAllBudgets:", error);
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération des budgets." });
        }
    },

    // Méthode pour obtenir le total mensuel des budgets d'un utilisateur
    getTotalMonthlyBudget: async (req, res) => {
        // Utilisez req.user.id pour obtenir l'ID de l'utilisateur connecté
        const { id } = req.params; 
    
        try {
            // Obtenez les informations sur le total mensuel du budget de l'utilisateur
            const totalBudgetInfo = await budgetService.getTotalMonthlyBudgetForUser(id);
            res.status(200).json(totalBudgetInfo);
        } catch (error) {
            // Gestion des erreurs lors de la récupération du total des budgets
            res.status(500).json({ error: "Une erreur est survenue lors de la récupération du total des budgets." });
        }
    },
    
};

export default budgetCtrl;
