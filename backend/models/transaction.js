// Importations des dépendances nécessaires
import { DataTypes } from 'sequelize';
import db from '../db/db.js';
import User from '../models/user.js';
import Category from '../models/category.js';
import PaymentMethod from '../models/paymentMethod.js';

// Messages d'erreur pour les validations
const errorMessages = {
    invalidCategory: "La catégorie n'est pas valide.",
    invalidTransactionType: "Le type de transaction doit être 'recette' ou 'dépense'."
};

// Définition du modèle 'Transaction' en utilisant Sequelize
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
            model: User, // Clé étrangère faisant référence au modèle User
            key: 'user_id' // Champ dans le modèle User auquel il est fait référence
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
        allowNull: false,
        defaultValue: new Date().toISOString() // Utilise la date et l'heure actuelles au format ISO 8601
    },
    paymentMethod_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: PaymentMethod, // Clé étrangère faisant référence au modèle PaymentMethod
            key: 'paymentMethod_id' // Champ dans le modèle PaymentMethod auquel il est fait référence
        },
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
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category, // Clé étrangère faisant référence au modèle Category
            key: 'category_id' // Champ dans le modèle Category auquel il est fait référence
        },
    },
}, {
    timestamps: false, // désactiver les timestamps (createdAt et updatedAt)
});

// Définition des associations (relations) entre les modèles
Transaction.belongsTo(Category, {
    foreignKey: 'category_id', // Utilise category_id pour la relation
    targetKey: 'category_id', // Champ dans la table Category auquel il est fait référence
    as: 'category', // Alias pour la relation
});

Transaction.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user', // Alias pour la relation
});

Transaction.belongsTo(PaymentMethod, {
    foreignKey: 'paymentMethod_id',
    as: 'paymentMethod', // Alias pour la relation
});

export default Transaction;
