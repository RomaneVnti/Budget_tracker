import Joi from 'joi';

// Cette fonction effectue la validation des données de transaction
const userValidation = (body) => {
    //Création du schema de la transaction
    const UserSchema = Joi.object({
        username: Joi.string().required().messages({
            'any.required': 'Le champ Nom d\'utilisateur est manquant',
        }),
        email: Joi.string()
            .email({ tlds: { allow: false } })
            .message("L'adresse e-mail n'est pas conforme.")
            .required()
            .messages({
                'any.required': 'Le champ Adresse e-mail est manquant',
            }),
        password: Joi.string().required().messages({
            'any.required': 'Le champ Mot de passe est manquant',
        }),
        firstName: Joi.string().required().messages({
            'any.required': 'Le champ Prénom est manquant',
        }),
        lastName: Joi.string().required().messages({
            'any.required': 'Le champ Nom est manquant',
        }),
    });

    return UserSchema.validate(body);
}

export default userValidation;
