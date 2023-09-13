// authService.js
import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import jwtSecret from '../config.js'; // Importez jwtSecret depuis le fichier de configuration



// Service d'authentification
const authService = {
  // Méthode pour authentifier l'utilisateur
  authenticateUser: async (email, password) => {
    try {
      console.log("Tentative de connexion...");

      // Recherche de l'utilisateur par email
      const user = await User.findOne({ where: { email } });

      // Si l'utilisateur n'existe pas, renvoyez une erreur
      if (!user) {
        console.log("Utilisateur introuvable");
        throw new Error('Login/mot de passe incorrect');
      }

      console.log("Utilisateur trouvé:", user);

      // Vérification du mot de passe en comparant le mot de passe haché stocké avec celui fourni
      const valid = await bcrypt.compare(password, user.password);

      // Si le mot de passe est invalide, renvoyez une erreur
      if (!valid) {
        console.log("Mot de passe invalide");
        throw new Error('Login/mot de passe incorrect');
      }

      console.log("Mot de passe valide");

      // Génération d'un jeton JWT contenant l'ID de l'utilisateur
      const payload = { sub: user.id };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h', subject:`${user.user_id}` });
      console.log("Token généré:", token);
      console.log("Clé secrète JWT:", jwtSecret);
      // Retournez les informations pertinentes de l'utilisateur et le jeton
      return {
        userId: user.user_id,
        email: user.email,
        firstName: user.firstName,
        token: token
      };
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      throw error; // Réutilisez la même erreur plutôt que d'en créer une nouvelle
    }
  },

  // Méthode pour vérifier un jeton JWT
  verifyJWT: async (token) => {
    try {
      // Vérifiez et décryptez le jeton JWT
      const decoded = jwt.verify(token, jwtSecret);
      const user = await User.findOne({ where: { user_id: decoded.sub } });
      return user;
    } catch (error) {
      throw new Error('Jeton JWT invalide');
    }
  }
};

export default authService;