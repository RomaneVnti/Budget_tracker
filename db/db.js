import {Sequelize} from 'sequelize';

export default new Sequelize('Budget_tracker', 'root', 'Norbert@oli34', {dialect : 'mysql', host : 'localhost'});