import sequelize from 'sequelize';
import db from '../db/db.js';
import Transaction from './transaction.js';
import bcrypt from 'bcrypt';

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

// Avant de sauvegarder l'utilisateur, cryptez son mot de passe
User.beforeCreate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});

User.beforeUpdate(async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
});


//Relation entre User et Transaction
User.hasMany(Transaction, { foreignKey: 'user_id' });

export default User;