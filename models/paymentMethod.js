// paymentMethod.js
import { DataTypes } from 'sequelize';
import db from '../db/db.js';

const PaymentMethod = db.define('payment_method', {
    paymentMethod_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    paymentMethodName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});

export default PaymentMethod;
