const authCtrl = {
    login: async (req, res) => {
        try {
            // Récupère l'utilisateur à partir des informations stockées dans le middleware d'authentification
            const user = req.user; // L'utilisateur est déjà authentifié grâce au middleware
            
            // Utilise les informations de l'utilisateur obtenues du middleware
            const filteredUser = {
                id: user.userId,
                email: user.email,
                firstName: user.firstName,
            };

            // Journalisation de l'authentification réussie
            console.log(`L'utilisateur ${filteredUser.email} s'est authentifié avec succès.`);

            res.status(200).json({ message: "Vous êtes bien authentifié", user: filteredUser, token: user.token });
        } catch (error) {
            console.error(error); // Journaliser l'erreur
            res.status(401).json({ message: "L'authentification a échoué : informations d'identification incorrectes." });
        }
    },
};

export default authCtrl;
