import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Charge les variables d'environnement depuis le fichier .env
dotenv.config({ path: '/Users/lunoroli/Library/Mobile Documents/com~apple~CloudDocs/ROMANE/PROJET_FIN_ETUDE/Budget_tracker/.env' });


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

export default sequelize;
