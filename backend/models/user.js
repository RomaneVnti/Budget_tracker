// Importation des dépendances nécessaires
import sequelize from 'sequelize';
import db from '../db/db.js'; 
import { hashPassword } from '../utils/passwordUtils.js'; 

const { DataTypes } = sequelize; 

// Messages d'erreur pour les validations
const errorMessages = {
    invalidEmail: "L'adresse email n'est pas valide.",
    passwordComplexity: "Le mot de passe doit contenir au moins 8 caractères, y compris des majuscules, des minuscules et des chiffres."
};

// Définition du modèle 'User' en utilisant Sequelize
const User = db.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        unique: true // Chaque utilisateur a un identifiant unique
    },
   
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // L'adresse e-mail doit être unique
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
    
    
});

// Avant de sauvegarder l'utilisateur, cryptez son mot de passe
User.beforeCreate(async (user) => {
    const hashedPassword = await hashPassword(user.password); // Utilise la fonction de hachage pour le mot de passe
    user.password = hashedPassword; //  mot de passe haché 
});

// Avant de mettre à jour l'utilisateur, cryptez son mot de passe
User.beforeUpdate(async (user) => {
    const hashedPassword = await hashPassword(user.password); // Utilise la fonction de hachage pour le mot de passe
    user.password = hashedPassword; // mot de passe haché 
});


export default User;
