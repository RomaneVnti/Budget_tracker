import jwt from 'jsonwebtoken';
import jwtSecret from '../config.js'; // Importez jwtSecret depuis le fichier de configuration
import authService from '../services/authService.js';

export const validateInputs = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(401).json({ message: "Les champs email et password sont requis." });
    }
    
    next();
};

export const authenticate = async (req, res, next) => {
    try {
        let user;

        // Vérifier si le token JWT est présent dans l'en-tête d'authorization
        const token = req.headers.authorization;
        if (token) {
            try{
                console.log("Token JWT reçu:", token); 
                user = await authService.verifyJWT(token.substring("Bearer ".length));
                if (!user) {
                    return res.status(401).json({ message: "L'utilisateur associé au token n'existe pas." });
                }else{
                    console.log("Utilisateur vérifier avec succès", user);
                }
            }catch (error) {
                console.error("Erreur de vérification du token:", error);
                return res.status(401).json({ message: "Token invalide" });
            }
        } else {
            // Sinon, utilisez l'authentification basée sur l'email et le mot de passe
            user = await authService.authenticateUser(req.body.email, req.body.password);
        }

        if (!user) {
            return res.status(401).json({ message: "L'authentification a échoué : informations d'identification incorrectes." });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication failed:", error);
        res.status(401).json({ message: "L'authentification a échoué : une erreur est survenue." });
    }
};
