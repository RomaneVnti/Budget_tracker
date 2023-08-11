import User from '../models/user.js';

const userService = {
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

    getOneUser: async (id) => {
        try {
            const user = await User.findByPk(id);
            return user;
        } catch (error) {
            throw error;
        }
    },

    createUser: async (userData) => {
        try {
            const newUser = await User.create(userData);
            return newUser;
        } catch (error) {
            throw error;
        }
    },

    updateUser: async (id, userData) => {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new Error('User not found');
            }

            user.username = userData.username;
            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.email = userData.email;

            await user.save();
            return user;
        } catch (error) {
            throw error;
        }
    },

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
