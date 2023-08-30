import express from 'express';
import routes from './routes/routes.js';
import Db from '../backend/db/db.js';
import passport from 'passport';
import cors from 'cors';


const app = express();

//configuration de CORS pour autoriser les requêtes provenant de localhost 3000
app.use(cors({
    origin: 'http://localhost:3000', //Url du frontend
    methods: ['GET', 'POST', 'DELETE', 'PUT'], //méthode utlisées
    credentials: true, //authoriser les cookies...
}))

app.use(express.json());
app.use(routes);
app.use(passport.initialize());



// Synchronise la base de données et démarre le serveur
async function startServer() {
    try {
        await Db.sync();
        console.log('Database connected');
        app.listen(8000, () => {
            console.log('Server is listening on port 8000');
        });
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

startServer();
