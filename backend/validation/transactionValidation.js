import Joi from 'joi';

// Cette fonction effectue la validation des données de transaction
const transactionValidation = (body) => {
    //Création du schema de la transaction
    const TransactionSchema = Joi.object({
        user_id: Joi.number().required().messages({
            'any.required': 'Le champ ID Utilisateur est manquant',
        }),
        transaction_amount: Joi.number().required().min(0).messages({
            'any.required': 'Le champ Montant de transaction est manquant',
            'number.min': 'Le montant de transaction ne peut pas être inférieur à zéro',
            'number.base': 'Le champ Montant ne peut pas être vide',
        }),
        description: Joi.string(),
        date: Joi.date().required().messages({
            'any.required': 'Le champ Date est manquant',
            'string.empty': 'Le champ date ne peut pas être vide',
        }),
        paymentMethod_id: Joi.number().required().messages({
            'any.required': 'Le champ ID Méthode de paiement est manquant',
            'number.base': 'Le champ Méthode de paiement ne peut pas être vide',
        }),
        category_id: Joi.number().required().messages({
            'any.required': 'Le champ ID Catégorie est manquant',
            'number.base': 'Le champ Catégorie ne peut pas être vide',
        }),
        type_transaction: Joi.string().required().allow('dépense').allow('recette').messages({
            'any.required': 'Le champ Type de transaction est manquant',
            'string.allow': 'Le champ Type de transaction doit être "dépense" ou "recette"',
            'string.empty': 'Le champ Type de transaction ne peut pas être vide',
        }),
    });

    return TransactionSchema.validate(body);
}

export default transactionValidation;