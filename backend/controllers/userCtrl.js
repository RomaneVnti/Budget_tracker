import userService from '../services/userService.js';
import UserValidation from '../validation/userValidation.js';

const userCtrl = {
    getAllUsers: (req, res) => {
        userService.getAllUsers()
            .then(users => res.status(200).json(users))
            .catch(error => res.status(500).json({ error: 'Server error' }));
    },

    getOneUser: (req, res) => {
        const { id } = req.params;
        userService.getOneUser(id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                return res.status(200).json(user);
            })
            .catch(error => res.status(500).json({ error: 'Server error' }));
    },

    createUser: (req, res) => {
        const { body } = req;
        const { error } = UserValidation(body);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        userService.createUser(body)
            .then(() => res.status(201).json({ message: 'User created successfully' }))
            .catch(error => res.status(500).json({ error: 'Server error' }));
    },

    updateUser: (req, res) => {
        const { body } = req;
        const { id } = req.params;

        userService.getOneUser(id)
            .then(user => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }

                const { error } = UserValidation(body);

                if (error) {
                    return res.status(400).json({ error: error.details[0].message });
                }

                userService.updateUser(id, body)
                    .then(() => res.status(200).json({ message: 'User updated successfully' }))
                    .catch(error => res.status(500).json({ error: 'Server error' }));
            })
            .catch(error => res.status(500).json({ error: 'Server error' }));
    },

    deleteUser: (req, res) => {
        const { id } = req.params;

        userService.deleteUser(id)
            .then(result => {
                if (result === 0) {
                    return res.status(404).json({ message: 'User not found' });
                }
                res.status(200).json({ message: 'User deleted successfully' });
            })
            .catch(error => res.status(500).json({ error: 'Server error' }));
    }
};

export default userCtrl;
