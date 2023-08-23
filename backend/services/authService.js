import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authService = {
    authenticateUser: async (email, password) => {
        try {
            console.log("Attempting login...");
            const user = await User.findOne({ where: { email } });

            if (!user) {
                console.log("User not found");
                throw new Error('login/mot de passe incorrecte');
            }

            console.log("User found:", user);

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                console.log("Invalid password");
                throw new Error('login/mot de passe incorrecte');
            }

            console.log("Password valid");

            const payload = { sub: user.id };
            const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '24h' });

            console.log("Token generated:", token);

            return {
                userId: user.user_id,
                email: user.email,
                token: token
            };
        } catch (error) {
            console.error("Authentication error:", error);
            throw error;
        }
    }
};

export default authService;
