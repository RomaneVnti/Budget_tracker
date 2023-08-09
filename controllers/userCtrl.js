import User from '../models/user.js';
import UserValidation from '../validation/userValidation.js';

//---METHODE GET ONEUSERS------------//

const getOneUser = async (req, res) => {
    const {id} = req.params;

    User.findByPk(id)
    .then(user => {
        if(!user) return res.status(404).json({message: 'User not found'});
        return res.status(200).json(user);
    })
    .catch(error => res.status(500).json(error));

};

//---METHODE GET ALLUSERS------------//

const getAllUsers = async (req, res) => {
    User.findAll({

    //Exclure les colonnes 'createdAt' et 'updatedAt' des résultats
    attributes: {exclude: ['createdAt', 'updatedAt']}
})
   .then(users => res.status(200).json(users))
   .catch(error => res.status(500).json(error));
};


//------------METHODE POST USERS------------//
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


//------------METHODE UPDATE USERS------------//

const updateUser = async (req, res) => {
    const{body} = req;
    const {id} = req.params;

    User.findByPk(id)
    .then(user => {
        if(!user) return res.status(404).json({message: "User not found"})
        user.username = body.username;
        user.firstName = body.firstName;
        user.lastName = body.lastName;
        user.email = body.email;
        user.password = body.password;
        user.save()
        .then(() => res.status(201).json({message: "User updated successfully"}))
        .catch((error) => res.status(500).json(error));
})


    .catch((error) => res.status(500).json(error));

};

//------------METHODE DELETE USERS------------//

const deleteUser = async (req, res) => {
    const {id} = req.params;
    
        User.destroy({where: {user_id: id}})
        .then(ressource => {
        if(ressource === 0) return res.status(404).json({message: 'User not found'})
        res.status(200).json({message: 'User deleted successfully'})
        })
        .catch((error) => res.status(500).json(error));
};




export { createUser, updateUser, deleteUser, getAllUsers, getOneUser };
