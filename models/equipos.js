const Sequelize = require('sequelize');
const sequelize = require('./db');

const Equipos = sequelize.define('equipos', {
    id: {type: Sequelize.INTEGER, primaryKey: true},
    nombre: Sequelize.STRING,
    poblacion: Sequelize.STRING,
    provincia: Sequelize.STRING,
    aforo:Sequelize.INTEGER
});

module.exports = equipos;