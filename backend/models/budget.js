// Importations des dépendances nécessaires
import { DataTypes } from 'sequelize';
import db from '../db/db.js'; 
import Category from '../models/category.js'; 
import User from '../models/user.js'; 

// Définition du modèle 'Budget' en utilisant Sequelize
const Budget = db.define('budget', {
    budget_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    budget_amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    budget_period_start: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    budget_period_end: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category, // Clé étrangère référençant le modèle Category
            key: 'category_id' // Champ dans le modèle Category auquel il est fait référence
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User, // Clé étrangère référençant le modèle User
            key: 'user_id' // Champ dans le modèle User auquel il est fait référence
        }
    }
}, {
    tableName: 'budget', // Nom de table personnalisé pour le modèle 'Budget'
    timestamps: false // Désactivation des horodatages automatiques
});


export default Budget;
