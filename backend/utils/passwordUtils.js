import bcrypt from 'bcrypt';

// Nombre de tours de hachage
const SALT_ROUNDS = 10;

// Fonction pour hacher le mot de passe
export async function hashPassword(password) {
    try {
        // Utilisation de bcrypt pour hacher le mot de passe avec le nombre de tours défini
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        return hashedPassword;
    } catch (error) {
        throw new Error('Erreur lors du hachage du mot de passe');
    }
};
