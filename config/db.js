const  Sequelize  = require('sequelize');
// Extraer valores de env
require('dotenv').config({path:'variables.env'})

// Option 1: Passing a connection URI
//const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
const db = new Sequelize(
    process.env.BD_NOMBRE,
    process.env.BD_USER,
    process.env.BD_PASS,

{
        host: 'process.env.DB_HOST',
        dialect:  'mysql',
        port:'process.env.DB_PORT', 
        //| 'mariadb' | 'postgres' | 'mssql' ,
        
        define:{
            timestamps:false
        },

        pool:{
            max:5,
            min: 0,
            acquire:30000,
            idle:10000
    }
    //Sqlite only
    //storage:'path/to/database.sqlite'

  }
  );

  module.exports=db;

