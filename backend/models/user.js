import sequelize from 'sequelize';
import db from '../db/db.js';
import { hashPassword } from '../utils/passwordUtils.js';




const {DataTypes} = sequelize;




const errorMessages = {
    invalidEmail: "L'adresse email n'est pas valide.",
    passwordComplexity: "Le mot de passe doit contenir au moins 8 caractères, y compris des majuscules, des minuscules et des chiffres."
};


//Table User
const User = db.define('user', {

    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        unique: true // chaque utilisateur à un identifiant unique
    }, 

    username: {
        type: DataTypes.STRING,
        allowNull: false,     
    }, 

    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: errorMessages.invalidEmail
            }
        }
    },  

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});


// Avant de sauvegarder l'utilisateur, cryptez son mot de passe
User.beforeCreate(async (user) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
});


//Avant de modifier l'utilisateur, cryptez son mot de passe
User.beforeUpdate(async (user) => {
    const hashedPassword = await hashPassword(user.password);
    user.password = hashedPassword;
});



export default User;