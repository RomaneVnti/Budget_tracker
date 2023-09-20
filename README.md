# README Budget_tracker
----------

##  Description
L'Application de Gestion de Budget est une solution moderne et conviviale conçue pour vous aider à prendre le contrôle de vos finances personnelles. Que vous souhaitiez suivre vos dépenses quotidiennes, planifier votre épargne pour l'avenir, ou simplement avoir une vue d'ensemble claire de vos finances, notre application est là pour vous accompagner.



## Fonctionnalités principales

- **Suivi des Dépenses** : Enregistrez facilement vos dépenses quotidiennes dans différentes catégories, ce qui vous permet de voir où va votre 

- **Budgets Personnalisés** : Définissez des budgets pour chaque catégorie de dépenses, et l'application vous alertera lorsque vous vous rapprochez de la limite.

- **Rapports et Graphiques** : Visualisez vos données financières à l'aide de graphiques et de rapports clairs qui vous aideront à prendre des décisions éclairées.

- **Gestion des Revenus** : Ajoutez vos sources de revenus régulières pour obtenir une vue d'ensemble complète de votre situation financière.

- **Sécurité des Données** : Vos informations financières sont stockées en toute sécurité avec des mesures de sécurité avancées pour protéger votre vie privée.




## Prérequis


 -  **Langage de programmation** : Nodejs et Reactjs 

- **Navigateur Web** : compatible sur tous les navigateurs

- **Base de Données** : MySql


## Installation

Voici les étapes pour pouvoir configurer et lancer le projet 

Pour lancer le server : `npm run dev`                                                                     
Pour lancer le client : `npm start`                                                                          

Voici les fichiers que vous devez créer et remplir par vous même                                                                 

.env à la racine du projet : 

1.  ` DB_NAME = "nom_de_votre_base"` 
2.   ` DB_USERNAME = "username_de_votre_base"`
3.    ` DB_PASSWORD = "password_de_votre_base" `
4.    ` DB_HOST = "votre_host"`
5.    ` SECRET_KEY = "votre_clé_secrète" `  


.backend/config.js : 

1. `jwtSecret = "votre_clé_secrète_authentification"`
