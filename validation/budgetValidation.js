import Joi from 'joi';


// Cette fonction effectue la validation des données de transaction
const BudgetValidation = (body) => {
    //Création du schema de la transaction
    const BudgetSchema = Joi.object({
        budget_amount: Joi.number().min(1).required().messages({
            'any.required': 'Le champ montant du budget est manquant',
            'number.base': 'Le champ montant du budget ne peut pas être vide',
            'number.min': 'Le montant ne peut pas être inférieur à zéro',
        }),


        budget_period_start: Joi.date().messages({
            'any.required': 'Le champ date de début est manquant',
            'date.base': 'Le champ date de début ne peut pas être vide',
        }),


        budget_period_end: Joi.date().messages({
            'any.required': 'Le champ date de fin est manquant',
            'date.base': 'Le champ date de fin ne peut pas être vide',
        }),


        category_id: Joi.number().required().messages({
            'any.required': 'Le champ categorie est manquant',
            'number.base': 'Le champ categorie ne peut pas être vide',
        }),


        user_id: Joi.number().required()
    });

    

    return BudgetSchema.validate(body);
}




export default BudgetValidation;