const Sequelize  = require('sequelize');
//database local credential
const sequelize  = new Sequelize(
    'csci5193',
    'csci5193',
    'admin',
    {
        dialect : 'mysql',
        host: 'database-1.cynphvvikx48.us-east-1.rds.amazonaws.com',
    }
);


module.exports = sequelize