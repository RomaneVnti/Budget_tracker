import { DataTypes } from 'sequelize';
import db from '../db/db.js';

const Category = db.define('category', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    categoryName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    logoFileName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

export default Category;