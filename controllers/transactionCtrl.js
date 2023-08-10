import transactionValidation from "../validation/transactionValidation.js";
import Transaction from "../models/transaction.js";


//------------------METHODE GET ALL TRANSACTIONS-------------------------------------------------------------------------------------------------


// Cette fonction récupère toutes les transactions de la base de données
const getAllTransactions = (req, res) => {

    // Utilisation de la méthode findAll() de Sequelize pour récupérer toutes les transactions
    Transaction.findAll({
        // Exclure les colonnes 'createdAt' et 'updatedAt' des résultats
        attributes: {exclude: ['createdAt', 'updatedAt']}
    })
    .then(transactions => res.status(200).json(transactions))
    .catch(error => res.status(500).json(error));
};


//------------------METHODE GET ONE TRANSACTIONS-------------------------------------------------------------------------------------------------

//Récupère une transaction par son id
const getOneTransaction = (req, res) => {
    const {id} = req.params;

    Transaction.findByPk(id)
   .then(transaction => {
    if(!transaction) return res.status(404).json({message: 'Transaction not found'});
    return res.status(200).json(transaction);
   })
   .catch(error => res.status(500).json(error));
};


//---------------------- METHODE POST----------------------------------------------------------------------------------------------------------

//Créer transaction 
const createOneTransaction = (req, res) => {
    //La fonction récupère le corps de la requête
    const {body} = req;
    //Vérifie que le corps de la requête est valide
    const {error} = transactionValidation(body);
    if(error) return res.status(400).json({error: error.details[0].message});

    //Crée une nouvelle transaction
    Transaction.create({...body})
    .then(() => {
        res.status(201).json({message: 'Transaction created successfully'});
    })
    .catch(error => res.status(500).json(error));

};


//------------------METHODE PUT ----------------------------------------------------------------------------------------------------------

//Modifie une transaction par son id

const updateOneTransaction = (req, res) => {
    const { body } = req;
    const { id } = req.params;

    // Valider les données de la requête
    const { error } = transactionValidation(body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    Transaction.findByPk(id)
        .then(transaction => {
            // Vérifier si la transaction existe
            if (!transaction) return res.status(404).json({ message: 'Transaction not found' })

            // Mettre à jour les propriétés de la transaction avec les valeurs du corps de la requête
            transaction.transaction_amount = body.transaction_amount;
            transaction.date = body.date;
            transaction.type_transaction = body.type_transaction;
            transaction.description = body.description;
            transaction.paymentMethod_id = body.paymentMethod_id;
            transaction.category_id = body.category_id;

            // Enregistrer les modifications dans la base de données
            transaction.save()
                .then(() => res.status(200).json({ message: 'Transaction updated successfully' }))
                .catch(error => res.status(500).json(error));
        })
        .catch(error => res.status(500).json(error));
};


// ------------------METHODE DELETE TRANSACTION----------------------------------------------------------------------------------------------------------

const deleteOneTransaction = (req, res) => {
    const {id} = req.params;
    
        Transaction.destroy({where: {id_transaction: id}})
        .then(ressource => {
            if(ressource === 0) return res.status(404).json({message: 'Transaction not found'})
            res.status(200).json({message: 'Transaction deleted successfully'})
        })
        .catch((error) => res.status(500).json(error));
};

export {getAllTransactions, getOneTransaction, createOneTransaction, updateOneTransaction, deleteOneTransaction};