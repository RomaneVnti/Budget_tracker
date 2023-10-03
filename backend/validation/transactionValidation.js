import Joi from 'joi';

// Crée un schéma de validation pour la transaction
const TransactionSchema = Joi.object({
    transaction_amount: Joi.number()
        .required()
        .min(0)
        .messages({
            'any.required': 'Le champ Montant de transaction est manquant',
            'number.min': 'Le montant de transaction ne peut pas être inférieur à zéro',
            'number.base': 'Le champ Montant ne peut pas être vide',
        }),

    description: Joi.string()
        .allow('')
        .max(45) // Limite la longueur de la description à 45 caractères (ajustez selon vos besoins)
        .messages({
            'string.max': 'La description ne peut pas dépasser 45 caractères',
        }),

    date: Joi.date()
        .required()
        .messages({
            'any.required': 'Le champ Date est manquant',
            'date.base': 'Le champ date ne peut pas être vide',
        }),

    category_id: Joi.number()
        .integer()
        .min(1) // L'ID de catégorie doit être un nombre entier positif
        .required()
        .messages({
            'any.required': 'Le champ categorie est manquant',
            'number.base': 'Le champ categorie ne peut pas être vide',
            'number.integer': 'Le champ categorie doit être un nombre entier',
            'number.min': 'Le champ categorie doit être supérieur ou égal à 1',
        }),

    type_transaction: Joi.string()
        .valid('dépense', 'recette') // Valide uniquement "dépense" ou "recette"
        .required()
        .messages({
            'any.required': 'Le champ Type de transaction est manquant',
            'any.only': 'Le champ Type de transaction doit être "dépense" ou "recette"',
            'string.empty': 'Le champ Type de transaction ne peut pas être vide',
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
const validateTransaction = (body) => {
    return TransactionSchema.validate(body, { abortEarly: false }); // AbortEarly permet de valider tous les champs et de retourner toutes les erreurs
};

export default validateTransaction;
