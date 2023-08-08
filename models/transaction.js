import sequelize from 'sequelize';
import db from '../db/db.js';

const {DataTypes} = sequelize;

const Transaction = db.define('transaction', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true
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
        allowNull: true
    },

    category_id: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

export default Transaction;