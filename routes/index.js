
const express = require('express');
const router = express.Router();

// importar express validator
//const {body}=require('express-validator/check');
//const express=require('express-validator');
//importar el controlador
const proyectoscontrolers =require
('../controlers/proyectoscontrolers');
const tareasControlers=require('/controlers/tareascontrolers');
const usuariosControlers=require('/controlers/usuariosControlers');
const authController= require('../controlers/authControlers');

module.exports = function(){
  
//ruta para el home

router.get('/',authControlers.usuarioAutenticado,proyectosControlers.proyectosHome);
router.get('/nuevo-proyecto',authControlers.usuarioAutenticado,proyectosController.formularioProyecto);
router.post('/nuevo-proyecto',authControlers.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectoscontrolers.nuevoProyecto);
/*router.get('/nosotros',(req, res)=>){
    res.render('nosotros');
)};*/

// Listar Proyecto
router.get('/proyectos/:url,authControlers.usuarioAutenticado,proyectoControlers.proyectoPorUrl');
// Actulaizar el proyecto
router.get('/proyecto/editar/:id',authControlers.usuarioAutenticado,proyectoControlers.proyectoPorUrl);
router.post('/nuevo-proyecto/:id',authControlers.usuarioAutenticado,
    body('nombre').not().isEmpty().trim().escape(),
    proyectoscontrolers.actualizarProyecto
    );
    //Eliminar proyecto
    router.delete('/proyectos/:url',authControlers.usuarioAutenticado, proyectosControlers.eliminarProyecto);
    // Tareas
    router.post('/proyectos/:url',authControlers.usuarioAutenticado,tareasControlers.agregarTarea);

    //Actualizar Tarea
    router.patch('/tareas/:id',authControlers.usuarioAutenticado,tareasControlers.combiarEstadoTarea);
    // Eliminar tarea
    router.delete('/tareas/:id',authControlers.usuarioAutenticado,tareasControlers.eliminarTarea);

    router.get('/crear-cuenta',usuariosControlers.formCrearCuenta);
    router.post('/crear-cuenta',usuariosControlers.crearCuenta);
    router.get('/confirmar/:correo',usuariosControlers.confirmarCuenta);

    router.get('/iniciar-sesion', usuariosControlers.formIniciarSesion);
    router.post('/iniciar-sesion',authController.autenticarUsuario);

    //cerrar sesion
    router.get('/cerrar-sesion',usuariosControlers.cerrarSesion);
    // Restablecer contraseña
    router.get('/reestablecr',usuariosControlers.formRestablecerPassword);
    router.post('/reestablecer',authControlers.enviarToken);
    router.get('/reestablecer/:token',authControlers.validarToken);
    router.post('/reestablecer/:token',authControlers.actualizarPassword);


return router;
}