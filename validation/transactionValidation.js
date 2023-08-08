import Joi from 'joi';

const transactionValidation = (body) => {
    const TransactionSchema = Joi.object({
        user_id: Joi.number().required(),
        transaction_amount: Joi.number().required().min(0),
        description: Joi.string(),
        date: Joi.date(),
        payment_method: Joi.string().required().allow('carte de crédit').allow('monnaie').allow('virement').allow('chèque').allow('paypal'),
        category_id: Joi.string().required(),
        type_transaction: Joi.string().required().allow('dépense').allow('recette'),
    });

    return TransactionSchema.validate(body);
}

export default transactionValidation;