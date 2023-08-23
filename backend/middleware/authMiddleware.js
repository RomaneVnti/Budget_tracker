import authService from '../services/authService.js'; // Assurez-vous que ce chemin est correct


export const validateInputs = (req, res, next) => {
    const { email, password } = req.body;
    
    if (!email || !password) {
        return res.status(401).json({ message: "Les champs email et password sont requis." });
    }
    
    next();
};


export const authenticate = async (req, res, next) => {
    try {
        console.log("Trying to authenticate...");
        const user = await authService.authenticateUser(req.body.email, req.body.password);
        console.log("User authenticated:", user);
        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication failed:", error);
        res.status(401).json({ message: "L'authentification a échoué." });
    }
};


