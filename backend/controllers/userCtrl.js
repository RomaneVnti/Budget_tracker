// Importation des modules et services nécessaires
import userService from '../services/userService.js';
import UserValidation from '../validation/userValidation.js';

// Définition de l'objet userCtrl qui regroupe les fonctions de gestion des utilisateurs
const userCtrl = {
    // Récupérer tous les utilisateurs
    getAllUsers: (req, res) => {
        userService.getAllUsers()
            .then(users => res.status(200).json(users))  // Envoi des utilisateurs au format JSON en cas de succès
            .catch(error => res.status(500).json({ error: 'Server error' }));  // Gestion des erreurs
    },

    // Récupérer un utilisateur par son ID
    getOneUser: (req, res) => {
        const { id } = req.params;
        userService.getOneUser(id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });  // Si l'utilisateur n'est pas trouvé
                }
                return res.status(200).json(user);  // Envoi de l'utilisateur au format JSON en cas de succès
            })
            .catch(error => res.status(500).json({ error: 'Server error' }));  // Gestion des erreurs
    },

    // Créer un nouvel utilisateur
    createUser: (req, res) => {
        const { body } = req;
        const { error } = UserValidation(body);  // Validation des données de l'utilisateur

        if (error) {
            return res.status(400).json({ error: error.details[0].message });  // Si la validation échoue
        }

        userService.createUser(body)
            .then(() => res.status(201).json({ message: 'User created successfully' }))  // Envoi d'un message en cas de succès
            .catch(error => res.status(500).json({ error: 'Server error' }));  // Gestion des erreurs
    },

    // Mettre à jour les informations d'un utilisateur
    updateUser: (req, res) => {
        const { body } = req;
        const { id } = req.params;

        userService.getOneUser(id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });  // Si l'utilisateur n'est pas trouvé
                }

                const { error } = UserValidation(body);  // Validation des données de l'utilisateur

                if (error) {
                    return res.status(400).json({ error: error.details[0].message });  // Si la validation échoue
                }

                userService.updateUser(id, body)
                    .then(() => res.status(200).json({ message: 'User updated successfully' }))  // Envoi d'un message en cas de succès
                    .catch(error => res.status(500).json({ error: 'Server error' }));  // Gestion des erreurs
            })
            .catch(error => res.status(500).json({ error: 'Server error' }));  // Gestion des erreurs
    },

    // Supprimer un utilisateur par son ID
    deleteUser: (req, res) => {
        const { id } = req.params;

        userService.deleteUser(id)
            .then(result => {
                if (result === 0) {
                    return res.status(404).json({ message: 'User not found' });  // Si l'utilisateur n'est pas trouvé
                }
                res.status(200).json({ message: 'User deleted successfully' });  // Envoi d'un message en cas de succès
            })
            .catch(error => res.status(500).json({ error: 'Server error' }));  // Gestion des erreurs
    }

    
};

export default userCtrl;
