// Importation du module authService à partir d'un chemin relatif
import authService from '../services/authService.js'; 

// Middleware pour valider les champs d'entrée
export const validateInputs = (req, res, next) => {
    const { email, password } = req.body;

    // Vérifie si email ou password sont manquants dans le corps de la requête
    if (!email || !password) {
        // Répond avec un code 401 et un message d'erreur approprié
        return res.status(401).json({ message: "Les champs email et password sont requis." });
    }

    // Si les champs sont présents, passe au middleware suivant
    next();
};

// Middleware pour l'authentification
export const authenticate = async (req, res, next) => {
    try {
        console.log("Trying to authenticate...");

        // Appelle authService.authenticateUser pour authentifier l'utilisateur
        const user = await authService.authenticateUser(req.body.email, req.body.password);

        // Affiche un message si l'authentification réussit
        console.log("User authenticated:", user);

        // Stocke l'utilisateur authentifié dans req.user
        req.user = user;

        // Passe au middleware suivant
        next();
    } catch (error) {
        console.error("Authentication failed:", error);

        // Répond avec un code 401 et un message d'erreur si l'authentification échoue
        res.status(401).json({ message: "L'authentification a échoué." });
    }
};
