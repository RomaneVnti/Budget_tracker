import User from '../models/user.js';

// Définition du service de gestion d'utilisateurs
const userService = {
    // Fonction pour obtenir tous les utilisateurs
    getAllUsers: async () => {
        try {
            const users = await User.findAll({
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            return users;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour obtenir un utilisateur par son ID
    getOneUser: async (id) => {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour créer un nouvel utilisateur
    createUser: async (userData) => {
        try {
            const newUser = await User.create(userData);
            return newUser;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour mettre à jour un utilisateur par son ID
    updateUser: async (id, userData) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }

            // Mettre à jour les propriétés de l'utilisateur avec les valeurs de userData
            user.username = userData.username;
            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.email = userData.email;

            // Sauvegarde de l'utilisateur mis à jour
            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    },

    // Fonction pour supprimer un utilisateur par son ID
    deleteUser: async (id) => {
        try {
            const rowsDeleted = await User.destroy({ where: { user_id: id } });
            if (rowsDeleted === 0) {
                throw new Error('User not found');
            }
            return true;
        } catch (error) {
            throw error;
        }
    }
};

export default userService;
