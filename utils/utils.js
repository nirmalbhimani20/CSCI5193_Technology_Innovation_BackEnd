const Sequelize  = require('sequelize');
//database local credential
const sequelize  = new Sequelize(
    'sql10451610',
    'sql10451610',
    'C73UAea7wD',
    {
        dialect : 'mysql',
        host: 'sql10.freesqldatabase.com',
    }
);


module.exports = sequelize