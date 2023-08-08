
// Importe Express, routes
import express from 'express';
import routes from './routes/routes.js';
import Db from './db/db.js';

// Crée une nouvelle instance de l'application Express.
const app = express();

app.use(express.json());
app.use(routes);

Db.sync()
.then((console.log('Connect Database')))
.catch(error => console.log(error));

// Démarre l'application Express sur le port 8000 et affiche un message dans la console.
app.listen(8000, () => console.log('Listening on port 8000'));