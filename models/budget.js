import { DataTypes } from 'sequelize';
import db from '../db/db.js';
import Category from '../models/category.js';
import User from '../models/user.js';

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
        type: DataTypes.DATE,
        allowNull: false,
    },
    budget_period_end: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'category_id'
        }
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'user_id'
        }
    }
}, {
    tableName: 'budget', // Spécifiez le nom de table personnalisé ici
    timestamps: false
});

export default Budget;
