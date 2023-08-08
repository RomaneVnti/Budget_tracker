
// Importe Express, routes
import express from 'express';
import routes from './routes/routes.js';

// Crée une nouvelle instance de l'application Express.
const app = express();

app.use(express.json());
app.use(routes);

// Démarre l'application Express sur le port 3000 et affiche un message dans la console.
app.listen(3000, () => console.log('Listening on port 3000'));