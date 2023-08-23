// Importation des dépendances nécessaires
import { DataTypes } from 'sequelize';
import db from '../db/db.js'; 

// Définition du modèle 'Category' en utilisant Sequelize
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
}, {
    tableName: 'category', // Nom de table personnalisé pour le modèle 'Category'
    timestamps: false // Désactivation des horodatages automatiques
});


export default Category;
