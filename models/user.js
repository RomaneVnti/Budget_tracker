import sequelize from 'sequelize';
import db from '../db/db.js';
import { hashPassword } from '../utils/passwordUtils.js';


const {DataTypes} = sequelize;


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

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: "L'adresse e-mail n'est pas conforme."
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
    try {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
    } catch (error) {
        throw error; 
    }
});


// Avant de modifier l'utilisateur, cryptez son mot de passe
User.beforeUpdate(async (user) => {
    try {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
    } catch (error) {
        throw error; 
    }
});


export default User;