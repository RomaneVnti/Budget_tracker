import Joi from 'joi';

// Messages d'erreur réutilisables
const errorMessages = {
  required: 'Le champ {{#label}} est manquant', // Message pour champ requis
  emptyString: 'Le champ {{#label}} ne peut pas être vide', // Message pour champ vide
};

// Cette fonction effectue la validation des données utilisateur
const userValidation = (body) => {
  // Création du schéma utilisateur
  const UserSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } }) // Validation de l'e-mail avec l'option tlds
      .required() // L'e-mail est requis
      .messages({
        'any.required': errorMessages.required,
        'string.empty': errorMessages.emptyString, 
      })
      .label('Adresse e-mail'), // Étiquette pour l'e-mail dans les messages d'erreur
    password: Joi.string()
      .required() // Le mot de passe est requis
      .messages({
        'any.required': errorMessages.required, 
        'string.empty': errorMessages.emptyString, 
      })
      .label('Mot de passe'), // Étiquette pour le mot de passe dans les messages d'erreur
    firstName: Joi.string()
      .required() // Le prénom est requis
      .messages({
        'any.required': errorMessages.required,
        'string.empty': errorMessages.emptyString, 
      })
      .label('Prénom'), // Étiquette pour le prénom dans les messages d'erreur
  });

  // Valide les données utilisateur avec le schéma défini
  return UserSchema.validate(body);
};

export default userValidation;
