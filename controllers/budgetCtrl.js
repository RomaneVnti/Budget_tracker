import Budget from '../models/budget.js';
import budgetValidation from '../validation/budgetValidation.js';

//-----------------Méthode POST : Créer un budget--------------------------------//
const createOneBudget = (req, res) => {
    // La fonction récupère le corps de la requête
    const { body } = req;

    // Vérifie que le corps de la requête est valide
    const { error } = budgetValidation(body);
    if (error) return res.status(400).json({ error: error.details[0].message });

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
        if(!budget) return res.status(404).json({message: 'Budget not found'})
        
                // Mettre à jour les propriétés du budget avec les valeurs du corps de la requête
                budget.budget_name = body.budget_name;
                budget.budget_amount = body.budget_amount;
                budget.category_id = body.category_id;
                budget.period_start_date = body.period_start_date;
                budget.period_end_date = body.period_end_date;
        
                // Enregistrer les modifications dans la base de données
                budget.save()
               .then(() => res.status(200).json({message: 'Budget updated successfully'}))
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
