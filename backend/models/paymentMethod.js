// Importation des dépendances nécessaires
import { DataTypes } from 'sequelize';
import db from '../db/db.js'; 

// Définition du modèle 'PaymentMethod' en utilisant Sequelize
const PaymentMethod = db.define('payment_method', {
    paymentMethod_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    paymentMethodName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Le nom de la méthode de paiement doit être unique
    },
}, {
    timestamps: false // Désactivation des horodatages automatiques
});

export default PaymentMethod;
