import authService from '../services/authService.js';

// Middleware pour valider les entrées (email et mot de passe) lors de l'authentification
export const validateInputs = (req, res, next) => {
    const { email, password } = req.body;

    // Vérification si l'email et le mot de passe sont présents dans la requête
    if (!email || !password) {
        return res.status(400).json({ message: "Les champs email et password sont requis." });
    }

    // Si les champs sont valides, middleware suivant
    next();
};

// Middleware pour l'authentification des utilisateurs
export const authenticate = async (req, res, next) => {
    try {
        let user;

        // Vérifier si le token JWT est présent dans l'en-tête d'authorization
        const jwtToken = req.headers.authorization;

        if (jwtToken) {
            try {
                // Vérification du token JWT en utilisant le service d'authentification
                user = await authService.verifyJWT(jwtToken.substring("Bearer ".length));

                // Si l'utilisateur associé au token n'existe pas, renvoyez une erreur
                if (!user) {
                    return res.status(401).json({ message: "L'utilisateur associé au token n'existe pas." });
                }
            } catch (error) {
                console.error("Erreur de vérification du token:", error);
                return res.status(401).json({ message: "Token invalide" });
            }
        } else {
            // Si aucun token n'est présent, effectuez l'authentification basée sur l'email et le mot de passe
            user = await authService.authenticateUser(req.body.email, req.body.password);

            if (!user) {
                return res.status(401).json({ message: "L'authentification a échoué : informations d'identification incorrectes." });
            }
        }

        // Créez un cookie contenant le token JWT
        const token = await authService.createJWT(user); // Assurez-vous d'ajouter cette fonction à authService

        // Configurez le cookie avec les options appropriées (par exemple, httpOnly, secure, etc.)
        res.cookie('jwtToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600 * 1000, // Durée de vie du cookie en millisecondes (1 heure)
        });

        // Stockez les informations de l'utilisateur dans req.user pour une utilisation ultérieure
        req.user = user;

        // Middleware suivant
        next();
    } catch (error) {
        console.error("Authentication failed:", error);
        res.status(401).json({ message: "L'authentification a échoué : une erreur est survenue." });
    }
};
