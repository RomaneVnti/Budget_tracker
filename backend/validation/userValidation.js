import Joi from 'joi';

// Cette fonction effectue la validation des données de transaction
const userValidation = (body) => {
    // Création du schema de la transaction
    const UserSchema = Joi.object({
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'any.required': 'Le champ Adresse e-mail est manquant',
                'string.empty': 'Le champ email ne peut pas être vide',
            }),
        password: Joi.string().required().messages({
            'any.required': 'Le champ Mot de passe est manquant',
            'string.empty': 'Le champ Mot de passe ne peut pas être vide',
        }),
        firstName: Joi.string().required().messages({
            'any.required': 'Le champ Prénom est manquant',
            'string.empty': 'Le champ Prénom ne peut pas être vide',
        }),
    });

    return UserSchema.validate(body);
}

export default userValidation;
