import bcrypt from 'bcrypt';

// Fonction de hachage du mot de passe
const SALT_ROUNDS = 10;

export async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erreur lors du hachage du mot de passe');
    }
}
