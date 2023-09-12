import authService from '../services/authService.js';
import dotenv from 'dotenv';
dotenv.config({ path: '/Users/lunoroli/Library/Mobile Documents/com~apple~CloudDocs/ROMANE/PROJET_FIN_ETUDE/Budget_tracker/.env' });

const secretKey = process.env.JWT_SECRET;

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
            // Si un token JWT est présent, vérifiez-le en utilisant process.env.JWT_SECRET
            user = await authService.verifyJWT(token);
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
