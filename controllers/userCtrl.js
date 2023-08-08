import User from '../models/user.js';
import UserValidation from '../validation/userValidation.js';


const getOneUser = async () => {};
const getAllUsers = async () => {};



const createUser = async (req, res) => {
    const{body} = req;

    
    const {error} = UserValidation(body);
    if(error)return res.status(400).json({error: error.details[0].message});
    
    User.create({...body})
    .then(() => {
        res.status(201).json({message: 'User created successfully'});
    })
    .catch(error => res.status(500).json(error));
};



const getUserById = async () => {};
const updateUser = async () => {};
const deleteUser = async () => {};

export { createUser, getUserById, updateUser, deleteUser, getAllUsers, getOneUser };
