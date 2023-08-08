import Joi from 'joi';


// Cette fonction effectue la validation des données de transaction
const transactionValidation = (body) => {
    //Création du schema de la transaction
    const TransactionSchema = Joi.object({
        user_id: Joi.number().required(),
        transaction_amount: Joi.number().required().min(0),
        description: Joi.string(),
        date: Joi.date().required(),
        payment_method: Joi.string().required().allow('carte de crédit').allow('monnaie').allow('virement').allow('chèque').allow('paypal'),
        category_id: Joi.string().required(),
        type_transaction: Joi.string().required().allow('dépense').allow('recette'),
    });

    return TransactionSchema.validate(body);
}

export default transactionValidation;