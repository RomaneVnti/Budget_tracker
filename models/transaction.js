import sequelize from 'sequelize';
import db from '../db/db.js';

const {DataTypes} = sequelize;

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



const Transaction = db.define('transaction', {
    id: {
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
                msg: "La catégorie n'est pas valide."
            }
        }
    },

    type_transaction: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: {
                args: [['recette', 'dépense']],
                msg: "Le type de transaction doit être 'recette' ou 'dépense'."
            }
        }
}});

export default Transaction;