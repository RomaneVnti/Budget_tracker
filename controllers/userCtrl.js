import User from '../models/user.js';
import UserValidation from '../validation/userValidation.js';



//---METHODE GET ONE USERS------------//

const getOneUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



//---METHODE GET ALL USERS------------//

const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            // Exclure les colonnes 'createdAt' et 'updatedAt' des résultats
            attributes: { exclude: ['createdAt', 'updatedAt'] }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



//------------METHODE POST USERS------------//

const createUser = async (req, res) => {
    const { body } = req;

    // Valider les champs de l'utilisateur
    const { error } = UserValidation(body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Vérification de la complexité du mot de passe
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordPattern.test(body.password)) {
        return res.status(400).json({
            error: 'Le mot de passe doit contenir au moins 8 caractères, y compris des majuscules, des minuscules et des chiffres.'
        });
    }

    // Vérifier si l'adresse e-mail est déjà utilisée par un autre compte
    const existingUser = await User.findOne({ where: { email: body.email } });
    if (existingUser) {
        return res.status(400).json({ error: 'This email is already in use by another account' });
    }

    // Valider si l'adresse e-mail est valide
    const isValidEmail = validateEmail(body.email);
    if (!isValidEmail) {
        return res.status(400).json({ error: 'Invalid email address' });
    }

    // Création de l'utilisateur
    try {
        await User.create({ ...body });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};



//------------METHODE UPDATE USERS------------//


const updateUser = async (req, res) => {
    const { body } = req;
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Vérifier si l'adresse e-mail est déjà utilisée par un autre compte
        if (body.email !== user.email) {
            const existingUser = await User.findOne({ where: { email: body.email } });
            if (existingUser) {
                return res.status(400).json({ error: 'This email is already in use by another account' });
            }
        }

        // Valider les champs de l'utilisateur
        const { error } = UserValidation(body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Valider si l'adresse e-mail est valide
        const isValidEmail = validateEmail(body.email);
        if (!isValidEmail) {
            return res.status(400).json({ error: 'Invalid email address' });
        }

        user.username = body.username;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.email = body.email;

        await user.save();
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server error' });
    }
};


// Fonction pour valider une adresse e-mail
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


//------------METHODE DELETE USERS------------//

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await User.destroy({ where: { user_id: id } });
        if (result === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export { createUser, updateUser, deleteUser, getAllUsers, getOneUser };
