
// Importe le framework Express depuis le module `express`.
import express from 'express';

// Crée une nouvelle instance de l'application Express.
const app = express();

// Démarre l'application Express sur le port 3000 et affiche un message dans la console.
app.listen(3000, () => console.log('Listening on port 3000'));