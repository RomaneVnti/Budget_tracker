import Joi from 'joi';


// Cette fonction effectue la validation des données de transaction
const userValidation = (body) => {
    //Création du schema de la transaction
    const UserSchema = Joi.object({
        username: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        firstName: Joi.string().required(),
        lastName: Joi.string().required()
    });

    return UserSchema.validate(body);
}

export default userValidation;