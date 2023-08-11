import authService from '../services/authService.js';

const authController = {
    login: (req, res) => {
        const { email, password } = req.body;

        authService.login(email, password)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(401).json({ message: error.message }));
    }
};

export default authController;
