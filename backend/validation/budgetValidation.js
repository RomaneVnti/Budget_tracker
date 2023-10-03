import Joi from 'joi';

// Crée un schéma de validation pour le budget
const BudgetSchema = Joi.object({
    budget_amount: Joi.number()
        .min(0.01) // Montant minimum du budget (par exemple, 0.01)
        .required()
        .messages({
            'any.required': 'Le champ montant du budget est manquant',
            'number.base': 'Le champ montant du budget ne peut pas être vide',
            'number.min': 'Le champ montant du budget doit être supérieur ou égal à 0.01',
        }),

    budget_period_start: Joi.date()
        .iso() // Format de date ISO (YYYY-MM-DD)
        .required()
        .messages({
            'any.required': 'Le champ date de début est manquant',
            'date.base': 'Le champ date de début ne peut pas être vide',
            'date.format': 'Le format de date de début n\'est pas valide (YYYY-MM-DD)',
        }),

    budget_period_end: Joi.date()
        .iso() // Format de date ISO (YYYY-MM-DD)
        .greater(Joi.ref('budget_period_start')) // Date de fin doit être postérieure à la date de début
        .required()
        .messages({
            'any.required': 'Le champ date de fin est manquant',
            'date.base': 'Le champ date de fin ne peut pas être vide',
            'date.format': 'Le format de date de fin n\'est pas valide (YYYY-MM-DD)',
            'date.greater': 'La date de fin doit être postérieure à la date de début',
        }),

    category_id: Joi.number()
        .integer()
        .min(1) // L'ID de catégorie doit être un nombre entier positif
        .required()
        .messages({
            'any.required': 'Le champ catégorie est manquant',
            'number.base': 'Le champ catégorie ne peut pas être vide',
            'number.integer': 'Le champ catégorie doit être un nombre entier',
            'number.min': 'Le champ catégorie doit être supérieur ou égal à 1',
        }),

    user_id: Joi.number()
        .integer()
        .min(1) // L'ID d'utilisateur doit être un nombre entier positif
        .required()
        .messages({
            'any.required': 'Le champ utilisateur est manquant',
            'number.base': 'Le champ utilisateur ne peut pas être vide',
            'number.integer': 'Le champ utilisateur doit être un nombre entier',
            'number.min': 'Le champ utilisateur doit être supérieur ou égal à 1',
        }),
});

// Cette fonction effectue la validation des données de transaction
const validateBudget = (body) => {
    return BudgetSchema.validate(body, { abortEarly: false }); // AbortEarly permet de valider tous les champs et de retourner toutes les erreurs
};

export default validateBudget;
