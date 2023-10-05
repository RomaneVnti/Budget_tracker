import User from '../models/user.js'; 
import bcrypt from 'bcrypt'; 
import jwt from 'jsonwebtoken'; 
import jwtSecret from '../config.js'; 

const authService = {
  // Méthode pour authentifier l'utilisateur
  authenticateUser: async (email, password) => {
    try {
      // Recherche de l'utilisateur par son adresse e-mail
      const user = await User.findOne({ where: { email } });

      // Si l'utilisateur n'existe pas, lance une erreur d'authentification
      if (!user) {
        throw new Error('Login/mot de passe incorrect');
      }

      // Vérifie le mot de passe en le comparant avec le hachage stocké dans la base de données
      const valid = await bcrypt.compare(password, user.password);

      // Si le mot de passe est invalide, lance une erreur d'authentification
      if (!valid) {
        throw new Error('Login/mot de passe incorrect');
      }

      // Crée un payload JWT avec l'ID de l'utilisateur
      const payload = { sub: user.id };
      
      // Signe le jeton JWT avec la clé secrète et spécifie une expiration de 24 heures
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '24h', subject: `${user.user_id}` });

      // Retourne les informations pertinentes de l'utilisateur et le jeton JWT
      return {
        userId: user.user_id,
        email: user.email,
        firstName: user.firstName,
        token: token
      };
    } catch (error) {
      throw new Error('Échec de l\'authentification');
    }
  },

  // Méthode pour vérifier un jeton JWT
  verifyJWT: async (token) => {
    try {
      // Vérifie et décrypte le jeton JWT en utilisant la clé secrète
      const decoded = jwt.verify(token, jwtSecret);

      // Recherche l'utilisateur associé à l'ID du jeton dans la base de données
      const user = await User.findOne({ where: { user_id: decoded.sub } });

      // Si l'utilisateur n'est pas trouvé, lance une erreur
      if (!user) {
        throw new Error('Utilisateur associé au jeton introuvable');
      }

      // Retourne l'utilisateur trouvé
      return user;
    } catch (error) {
      // Gère les erreurs liées au jeton JWT invalide
      throw new Error('Jeton JWT invalide');
    }
  }
};

export default authService;