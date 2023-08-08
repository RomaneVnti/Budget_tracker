import sequelize from 'sequelize';
import db from '../db/db.js';
import Transaction from './transaction.js';

const {DataTypes} = sequelize;

const User = db.define('user', {

    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true,
        unique: true // chaque utilisateur à un identifiant unique
    }, 

    username: {
        type: DataTypes.STRING,
        allowNull: false,     
    }, 

    email : {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 

    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },

});


//Relation entre User et Transaction
User.hasMany(Transaction, { foreignKey: 'user_id' });

export default User;