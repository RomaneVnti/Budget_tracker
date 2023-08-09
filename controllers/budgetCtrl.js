import Budget from '../models/budget.js';
import budgetValidation from '../validation/budgetValidation.js';

// Méthode POST : Créer un budget
const createOneBudget = (req, res) => {
    // La fonction récupère le corps de la requête
    const { body } = req;

    // Vérifie que le corps de la requête est valide
    const { error } = budgetValidation(body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    // Crée un nouveau budget
    Budget.create({ ...body })
        .then(() => {
            res.status(201).json({ message: 'Budget created successfully' });
        })
        .catch(error => res.status(500).json(error));
};

// Méthode PUT : Mettre à jour un budget
const updateOneBudget = () => {
    // Implémentation à venir
};

// Méthode DELETE : Supprimer un budget
const deleteOneBudget = () => {
    // Implémentation à venir
};

// Méthode GET : Consulter un budget par son ID
const getOneBudget = () => {
    // Implémentation à venir
};

// Méthode GET : Consulter tous les budgets
const getAllBudgets = () => {
    // Implémentation à venir
};

export {
    createOneBudget,
    updateOneBudget,
    deleteOneBudget,
    getOneBudget,
    getAllBudgets
};
