const sequelize = require('./db');
const Equipos = require('./equipos');

sequelize
  .authenticate()
  .then(() => {
    console.log('Conectado con la base de datos.');
    sequelize.sync({alter: true}); //crea las tablas si no existen
  })
  .catch(err => {
    console.error('Error conectando con la base de datos: ', err);
  });

  module.exports = {
      sequelize,
      Equipos
  }