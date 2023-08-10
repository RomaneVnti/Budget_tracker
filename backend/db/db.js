import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Charge les variables d'environnement depuis le fichier .env
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

export default sequelize;
