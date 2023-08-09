import Joi from 'joi';


// Cette fonction effectue la validation des données de transaction
const BudgetValidation = (body) => {
    //Création du schema de la transaction
    const BudgetSchema = Joi.object({
        budget_amount: Joi.number().min(1).required(),
        budget_period_start: Joi.date(),
        budget_period_end: Joi.date(),
        category_id: Joi.number().required(),
        user_id: Joi.number().required()
    });

    

    return BudgetSchema.validate(body);
}




export default BudgetValidation;