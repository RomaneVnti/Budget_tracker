import Joi from 'joi';

const transactionValidation = (body) => {
    const TransactionSchema = Joi.object({
        transaction_amount: Joi.number().required(),
        description: Joi.string(),
        date: Joi.date(),
        payment_method: Joi.string().required(),
        category_id: Joi.string().required()
    });

    return TransactionSchema.validate(body);
}

export default transactionValidation;