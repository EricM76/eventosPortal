'use strict';
const fetch = require('node-fetch')

const getPaises = async () => {
  try {
    const response = await fetch("https://restcountries.com/v2/all");
    const result = await response.json();

    const filtro = result.filter((country) => {
      return(country.region == "Americas" || country.translations.es == "Israel" || country.translations.es == "España")
    } );

    console.log(filtro)
    const paises = filtro.map(country => {
      if(country.translations.es != undefined){
        let item =  {
          name : country.translations.es,
          callingCode : parseInt(country.callingCodes[0]),
          createdAt : new Date,
          updatedAt : new Date
      }
      return item
      }
    })
    paises.sort((a,b) => a['name'] > b['name'] ? 1 : -1)
    return paises

} catch (error) {
    console.log(error);
}
}

module.exports = {
  up: async (queryInterface, Sequelize) => {

    let paises = await getPaises();

    await queryInterface.bulkInsert('Countries', paises, {});
  
  },

  down: async (queryInterface, Sequelize) => {
 
    await queryInterface.bulkDelete('Countries', null, {});
    
  }
};
