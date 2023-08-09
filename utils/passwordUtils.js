import bcrypt from 'bcrypt';

// Fonction de hachage du mot de passe
export async function hashPassword(password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erreur lors du hachage du mot de passe');
    }
}