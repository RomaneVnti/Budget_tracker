import userService from '../services/userService.js';
import UserValidation from '../validation/userValidation.js';

// Fonction utilitaire pour gérer les erreurs de manière uniforme
const handleError = (res, error, message) => {
    console.error(message, error);
    res.status(500).json({ error: 'Erreur du serveur' });
};

const userCtrl = {
    getAllUsers: async (req, res) => {
        try {
            // Récupère tous les utilisateurs en utilisant le service userService
            const users = await userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            handleError(res, error, "Erreur lors de la récupération de tous les utilisateurs :");
        }
    },

    getOneUser: async (req, res) => {
        const { id } = req.params;
        try {
            // Récupère un utilisateur par son ID en utilisant le service userService
            const user = await userService.getOneUser(id);
            if (!user) {
                return res.status(404).json({ message: 'Utilisateur introuvable' });
            }
            res.status(200).json(user);
        } catch (error) {
            // Gère les erreurs en utilisant la fonction handleError
            handleError(res, error, "Erreur lors de la récupération de l'utilisateur par ID :");
        }
    },

    createUser: async (req, res) => {
        const { body } = req;
        try {
            // Valide les données de l'utilisateur en utilisant UserValidation
            const { error } = UserValidation(body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            // Crée un nouvel utilisateur en utilisant le service userService
            await userService.createUser(body);
            res.status(201).json({ message: 'Utilisateur créé avec succès' });
        } catch (error) {
            // Gère les erreurs en utilisant la fonction handleError
            handleError(res, error, "Erreur lors de la création de l'utilisateur :");
        }
    },

    updateUser: async (req, res) => {
        const { body } = req;
        const { id } = req.params;
        try {
            // Récupère un utilisateur par son ID en utilisant le service userService
            const user = await userService.getOneUser(id);

            if (!user) {
                return res.status(404).json({ message: 'Utilisateur introuvable' });
            }

            // Valide les données de l'utilisateur en utilisant UserValidation
            const { error } = UserValidation(body);

            if (error) {
                return res.status(400).json({ error: error.details[0].message });
            }

            // Met à jour les informations de l'utilisateur en utilisant le service userService
            await userService.updateUser(id, body);
            res.status(200).json({ message: 'Informations de l\'utilisateur mises à jour avec succès' });
        } catch (error) {
            // Gère les erreurs en utilisant la fonction handleError
            handleError(res, error, "Erreur lors de la mise à jour de l'utilisateur :");
        }
    },

    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            // Supprime un utilisateur par son ID en utilisant le service userService
            const result = await userService.deleteUser(id);

            if (result === 0) {
                // Si l'utilisateur n'est pas trouvé, renvoie une réponse JSON avec un statut 404 (non trouvé)
                return res.status(404).json({ message: 'Utilisateur introuvable' });
            }

            res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
        } catch (error) {
            // Gère les erreurs en utilisant la fonction handleError
            handleError(res, error, "Erreur lors de la suppression de l'utilisateur :");
        }
    }
};

export default userCtrl;