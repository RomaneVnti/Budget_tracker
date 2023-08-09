import sequelize from 'sequelize';
import db from '../db/db.js';

const {DataTypes} = sequelize;


//Messages d'erreur 
const errorMessages = {
    invalidCategory: "La catégorie n'est pas valide.",
    invalidTransactionType: "Le type de transaction doit être 'recette' ou 'dépense'."
};


//Les catégories doivent être mises dans une table à part

const validCategories = [
    'Logement',
    'Transport',
    'Aliments',
    'Vêtements',
    'Soins personnels',
    'Loisirs',
    'Économies',
    'Dettes',
    'Autres',
    'Santé',
    'Éducation',
    'Assurances',
    'Divertissement',
    'Cadeaux et dons',
    'Impôts',
    'Voyages',
    'Investissements',
    'Remboursements',
    'Revenus supplémentaires'
];

//Table Transaction 

const Transaction = db.define('transaction', {
    id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },

    user_id : {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: true
    },

    payment_method: {
        type: DataTypes.STRING,
        allowNull: false
    },

    category_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [validCategories],
                msg: errorMessages.invalidCategory
            }
        }
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
}});

export default Transaction;