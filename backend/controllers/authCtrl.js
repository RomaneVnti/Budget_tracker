
const authCtrl = {
    login: async (req, res) => {
        try {
            const user = req.user; // L'utilisateur est déjà authentifié grâce au middleware
            
            // Utilisez les informations de l'utilisateur obtenues du middleware
            const filteredUser = {
                id: user.userId,
                email: user.email,
                // Autres informations non sensibles
            };

            res.status(200).json({ message: "Vous êtes bien authentifié", user: filteredUser });
        } catch (error) {
            res.status(401).json({ message: "L'authentification a échoué." });
        }
    }
};

export default authCtrl;















