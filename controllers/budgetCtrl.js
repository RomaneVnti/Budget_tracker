import Budget from '../models/budget.js';
import BudgetValidation from '../validation/budgetValidation.js';

//-----------------Méthode POST : Créer un budget--------------------------------//
const createOneBudget = (req, res) => {
    // La fonction récupère le corps de la requête
    const { body } = req;

    // Tableau pour stocker les messages d'erreur
    const missingFields = [];

    // Vérifie que les champs requis sont présents
    if (!body.category_id) {
        missingFields.push('Catégorie');
    }
    if (typeof body.budget_amount === 'undefined' || body.budget_amount === null) {
        missingFields.push('Montant du budget');
    } else if (body.budget_amount <= 0) {
        return res.status(400).json({ error: 'Le montant du budget ne peut pas être égal ou inférieur à zéro' });
    }
    if (!body.budget_period_start) {
        missingFields.push('Date de début du budget');
    }
    if (!body.budget_period_end) {
        missingFields.push('Date de fin du budget');
    }
    // Ajoutez ici d'autres champs requis

    // Si des champs sont manquants, renvoyer un message d'erreur
    if (missingFields.length > 0) {
        const errorMessage = `Champs Manquants : ${missingFields.join(', ')}`;
        return res.status(400).json({ error: errorMessage });
    }

    // Vérifie que le corps de la requête est valide
    const { error } = BudgetValidation(body);
    if (error) {
        // Si des erreurs de validation sont présentes, renvoyer un message d'erreur
        return res.status(400).json({ error: error.details[0].message });
    }

    // Vérifie que les dates de début et de fin sont cohérentes
    if (body.budget_period_start >= body.budget_period_end) {
        return res.status(400).json({ error: 'La date de début doit être antérieure à la date de fin' });
    }

    // Crée un nouveau budget
    Budget.create({ ...body })
        .then(() => {
            res.status(201).json({ message: 'Budget created successfully' });
        })
        .catch(error => res.status(500).json(error));
};





//------------------Méthode PUT : Mettre à jour un budget--------------------------------//

const updateOneBudget = (req, res) => {
    const { body } = req;
    const { id } = req.params;

    Budget.findByPk(id)
    .then(budget => {
        // Vérifier si le budget existe
        if (!budget) return res.status(404).json({ message: 'Budget not found' });

        // Vérifie que les dates de début et de fin sont cohérentes
        if (body.budget_period_start >= body.budget_period_end) {
            return res.status(400).json({ error: 'La date de début doit être antérieure à la date de fin' });
        }
        
        // Valider les données du budget, y compris le montant
        const { error } = BudgetValidation(body);
        if (error) {
            // Si des erreurs de validation sont présentes, renvoyer un message d'erreur
            if (error.details[0].path.includes('budget_amount')) {
                return res.status(400).json({ error: 'Le montant du budget ne peut pas être égal ou négatif' });
            }
            return res.status(400).json({ error: error.details[0].message });
        }

        // Mettre à jour les propriétés du budget avec les valeurs du corps de la requête
        budget.budget_amount = body.budget_amount;
        budget.budget_period_start = body.budget_period_start;
        budget.budget_period_end = body.budget_period_end;
        budget.category_id = body.category_id;
        budget.user_id = body.user_id;
        
        // Enregistrer les modifications dans la base de données
        budget.save()
        .then(() => res.status(200).json({ message: 'Budget updated successfully' }))
        .catch(error => res.status(500).json(error))
    })
};



//------------------Méthode DELETE : Supprimer un budget-------------------------------------//


const deleteOneBudget = (req, res) => {
    const{id} = req.params;

    Budget.destroy({where: {budget_id: id}})
    .then(ressource => {
        if(ressource === 0) return res.status(404).json({message: 'Budget not found'})
        res.status(200).json({message: 'Budget deleted successfully'})
})
    .catch((error) => res.status(500).json(error));

};

//------------------Méthode GET : Consulter un budget par son ID--------------------------------------//


const getOneBudget = async (req, res) => {
    const { id } = req.params;

    try {
        const budget = await Budget.findByPk(id);

        if (!budget) {
            return res.status(404).json({ message: 'Budget not found' });
        }

        return res.status(200).json(budget);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};


//------------------Méthode GET : Consulter tous les budgets------------------------------//
const getAllBudgets = (req, res) => {
    Budget.findAll({
        //Exclure les colonnes 'createdAt' et 'updatedAt' des résultats
        attributes: {exclude: ['createdAt', 'updatedAt']}
})
       .then(budget => res.status(200).json(budget))
       .catch(error => res.status(500).json(error));
};

export {
    createOneBudget,
    updateOneBudget,
    deleteOneBudget,
    getOneBudget,
    getAllBudgets
};
