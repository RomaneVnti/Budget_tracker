import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const authService = {
    login: async (email, password) => {
        try {
            const user = await User.findOne({ where: { email } });

            if (!user) {
                throw new Error('login/mot de passe incorrecte');
            }

            const valid = await bcrypt.compare(password, user.password);

            if (!valid) {
                throw new Error('login/mot de passe incorrecte');
            }

            const payload = { sub: user.id };
            const token = jwt.sign(payload, 'yourSecretKey', { expiresIn: '24h' });

            return {
                userId: user.user_id,
                token: token
            };
        } catch (error) {
            throw error;
        }
    }
};

export default authService;
