import express from 'express';
import routes from './routes/routes.js';
import Db from '../backend/db/db.js';
import passport from 'passport';
import cors from 'cors';
import jwtSecret from './config.js';
import session from 'express-session';
import MemoryStore from 'memorystore'; // Importez Memorystor
import cookieParser from 'cookie-parser';


const app = express();
const MemoryStoreSession = MemoryStore(session); // Créez un MemoryStore pour la session

// Configuration de CORS pour autoriser les requêtes provenant de localhost 3000
app.use(cors({
  origin: 'http://localhost:3000', // URL du frontend
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Méthodes utilisées
  credentials: true, // Autoriser les cookies
}));

// Configuration de la session avec une durée de 5 minutes et rolling activé
app.use(session({
  secret: jwtSecret,
  resave: false,
  saveUninitialized: false, // Ne pas enregistrer les sessions vides
  rolling: true, // Activation du rolling pour prolonger la session
  store: new MemoryStoreSession({
    checkPeriod: 300000, // Vérification de l'expiration toutes les 5 minutes
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production', // Utilisation de HTTPS en production
    maxAge: 300000, // Durée de 5 minutes en millisecondes
  },
}));

// Middleware pour la gestion de l'inactivité
const inactivityTimeout = 300000; // 5 minutes en millisecondes

app.use((req, res, next) => {
  if (req.session && req.session.cookie) {
    const now = new Date().getTime();
    const lastActivity = req.session.cookie.lastActivity;

    if (now - lastActivity > inactivityTimeout) {
      // Déconnexion de l'utilisateur en détruisant la session
      req.session.destroy((err) => {
        if (err) {
          console.error('Erreur lors de la destruction de la session:', err);
        }
        // Redirection vers la page de connexion ou autre action appropriée
        res.redirect('/login'); // Redirigez vers la page de connexion par exemple
      });
    } else {
      // Mettez à jour le dernier horodatage d'activité de la session
      req.session.cookie.lastActivity = now;
    }
  }
  next();
});

app.use(express.json());
app.use(cookieParser()); // Utilisation de cookie-parser pour gérer les cookies
app.use(routes);
app.use(passport.initialize());

// Synchronise la base de données et démarre le serveur
async function startServer() {
  try {
    await Db.sync();
    //console.log('Base de donnée connectée');
    app.listen(8000, () => {
      //console.log('Serveur écouté sur le port 8000');
    });
  } catch (error) {
    //console.error('Erreur de connexion à la base de données:', error);
  }
}

startServer();
