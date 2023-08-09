import { DataTypes } from 'sequelize';
import db from '../db/db.js';
import User from '../models/user.js';
import Category from '../models/category.js';


//Messages d'erreur 
const errorMessages = {
    invalidCategory: "La catégorie n'est pas valide.",
    invalidTransactionType: "Le type de transaction doit être 'recette' ou 'dépense'."
};







//Table Transaction 

const Transaction = db.define('transaction', {
    

    id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    },

    transaction_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: new Date().toISOString() // Utilise la date et l'heure actuelles au format ISO 8601
    },

    payment_method: {
        type: DataTypes.STRING,
        allowNull: false
    },

    type_transaction: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['recette', 'dépense']],
                msg: errorMessages.invalidTransactionType
            }
        }
    },

    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

Transaction.belongsTo(Category, {
    foreignKey: 'categoryName', // Utilise categoryName pour la relation
    targetKey: 'categoryName', // Colonne à référencer dans la table Category
    as: 'category',
});

Transaction.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});



export default Transaction;
