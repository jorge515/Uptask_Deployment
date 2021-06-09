const Sequelize =require('sequelize');
//importamos sequelize porque contiene todos los metodos
const  db= require('../config/db');
// importa la configuracion y conexion a la bd

const slug = require('slug');
const shortid = require('shortid');
const Proyectos= db.define('proyectos',{
    Id :{
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true ,
    },
    nombre: Sequelize.STRING(100),
    url:Sequelize.STRING(100)
    },{
        hooks:{
           beforeCreate(proyecto){
               const url=slug(proyecto.nombre).toLowerCase();


               proyecto.url=`${url}-${shortid.generate()}`
           }
       }
    });
module.exports =Proyectos;
// definimos el modelo