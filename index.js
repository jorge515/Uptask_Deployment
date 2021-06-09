const express = require('express');
const routes = require('./routes');
const path= require('path');
//const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session =require('express-session');
const cookieParser= require('cookie-parser');
const passport=require('./config/passport');
const passport=require('dotenv').config({path:'variables.env'})
//crear una app de express
// Crear la conexion a la BD
// helpers
const helpers =require('./helpers');
const db = require('./config/db');
const bodyParser = require('body-parser');
//const Proyectos = require('./models/Proyectos');

// Importar el modelo
require('./models/Proyectos');
require('./models/Tareas');
require('./models/Usuarios');

db.sync()
   .then(()=> console.log('Conectado al Servidor'))
   .catch((error)=> console.log(error));

const app= express();

app.use(express.static('public'));

//habilitar pug
app.set('view engine', 'pug');

//app.use(bodyParser.urlencoded({extended:true}));

app.use(expressValidator());
//Donde cargar los archivos estaticos


//añadir las carpetas de las vistas
app.set('views',path.join(__dirname,'./views'));

app.use(cookieParser());



app.use(session({
   secret:'keyboard cat',
   resave:false,
   saveUninitialized:false

}));
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

 // Pasar var dump a la aplicacion
 app.use((req,res,next)=>{
    //console.log(req.user);
    
    res.locals.vardump= helpers.vardump;
    res.locals.mensajes=req.flash();
    res.locals.usuario = {...req.user} || null;
    next();
 });

//Habilitar bodyparser para leer los datos del formulario
//app.use(express.json());
//app.use(express.urlencoded({extended: true}));


app.use('/',routes());


// Servidor y Puerto
const host= process.env.HOST || '0.0.0.0';
const port= process.env.PORT || 3000;

app.listen(port, host,()=> {
   console.log('El servidor esta funcionado');
})