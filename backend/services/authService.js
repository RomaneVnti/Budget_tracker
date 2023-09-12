import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Définition du service d'authentification
const authService = {
    authenticateUser: async (email, password) => {
        try {
            console.log("Attempting login...");

            // Recherche de l'utilisateur par email
            const user = await User.findOne({ where: { email } });

            if (!user) {
                console.log("User not found");
                throw new Error('login/mot de passe incorrecte');
            }

            console.log("User found:", user);

            // Vérification du mot de passe en comparant le mot de passe hashé stocké avec le mot de passe fourni
            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                console.log("Invalid password");
                throw new Error('login/mot de passe incorrecte');
            }

            console.log("Password valid");

            const secretKey = process.env.JWT_SECRET; // Utilisez process.env pour accéder à la variable d'environnement

            // Génération d'un jeton JWT contenant l'ID de l'utilisateur
            const payload = { sub: user.id };
            const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '24h' });

            console.log("Token generated:", token);

            // Retour des informations pertinentes de l'utilisateur et du jeton
            // Retour des informations pertinentes de l'utilisateur et du jeton, y compris le prénom
            return {
                userId: user.user_id,
                email: user.email,
                firstName: user.firstName, // Ajoutez cette ligne pour inclure le prénom
                token: token
            };
        } catch (error) {
            console.error("Authentication error:", error);
            throw error;
        }
    }
};

export default authService;