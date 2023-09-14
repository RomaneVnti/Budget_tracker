// Importations des modules et services nécessaires
import budgetService from '../services/budgetService.js'; 
import BudgetValidation from '../validation/budgetValidation.js'; 

// Contrôleur de gestion des budgets
const budgetCtrl = {
    // Méthode pour créer ou mettre à jour un budget
    createOneBudget: async (req, res) =>{
      const { body } = req;
    
      const { error } = BudgetValidation(body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
    
      try {
        // Récupérez l'ID de l'utilisateur connecté depuis req.user (assumant que votre middleware d'authentification stocke l'utilisateur connecté dans req.user)
        const userId = req.user.user_id;
    
        // Vérifiez si un budget existe déjà pour la catégorie et l'utilisateur spécifiés
        const existingBudget = await budgetService.getBudgetByCategoryAndUser(body.category_id, userId);
    
        if (existingBudget) {
          // Si un budget existe, mettez à jour le budget existant
          await budgetService.updateBudgetForCategoryAndUser(body.category_id, userId, body);
          res.status(200).json({ message: 'Budget updated successfully' });
        } else {
          // Si aucun budget n'existe, créez-en un nouveau
          // Assurez-vous d'ajouter l'ID de l'utilisateur au corps du budget
          body.user_id = userId;
    
          await budgetService.createOneBudget(body);
          res.status(201).json({ message: 'Budget created successfully' });
        }
      } catch (error) {
        console.error("Error in create/update budget:", error);
        res.status(500).json({ error: "An error occurred while creating/updating the budget." });
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


  getTotalMonthlyBudget: async (req, res) => {
    try {
      // Utilisez req.user.id pour obtenir l'ID de l'utilisateur connecté
      const userId = req.user.user_id;          
        console.log(`getTotalMonthlyBudget called for userId: ${userId}`);

      // Obtenez les informations sur le total mensuel du budget de l'utilisateur
      const totalBudgetInfo = await budgetService.getTotalMonthlyBudgetForUser(userId);

      res.status(200).json(totalBudgetInfo);
    } catch (error) {
      console.error("Error in getTotalMonthlyBudget:", error);
      res.status(500).json({ error: "Une erreur est survenue lors de la récupération du total des budgets." });
    }
  },

   getAllCategories: async (req, res) => {
    try {
      const categories = await budgetService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories :', error);
      res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des catégories.' });
    }
  }
  
 
};
    


export default budgetCtrl;
