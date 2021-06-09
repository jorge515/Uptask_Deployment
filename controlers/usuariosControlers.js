
const Usuarios = require("../models/Usuarios");
const enviarEmail=require('../handler/mail');

exports.formCrearCuenta = (req, res)=>{
    res.render('crearCuenta',{
          nombrePagina:'Crear Cuenta en Uptask'
    })
}

exports.formIniciarSesion = (req, res)=>{
    const {error}=res.locals.mensajes;
    res.render('iniciarSesion',{
          nombrePagina:'Iniciar Sesion en Uptask',
          error
    })
}


exports.crearCuenta=async (req, res)=>{
   const{email, password}= req.body;
   try{
       await  Usuarios.create({
        email,
        password
    });
    const confirmarUrl=`http://${req.headers.host}/confirmar/${email}`;

    const usuario={
        email
    }
    await enviarEmail.enviar({
        usuario,
        subject:'Confirma tu cuenta Uptask',
        resetUrl,
        archivo:'confirmar-cuenta'
    });


    res.flash('correcto','Enviamos un correo , confirma tu cuenta');
    res.redirect('/iniciar-sesion');

   } catch(error){
       req.flash('error',error.errors.map(error=>error.message));
       res.render('crearCuenta',{
           mensajes:req.flash(),
           nombrePagina:'Crear Cuenta en Uptask',
           email,
           password

       })
   }
 }
 exports.formRestablecerPassword=(req, res)=>{
     res.render('reestablecer',{
         nombrePagina:'Reestablecer tu contraseña'
     })
 }
 // camiba el estado de una cuenta
 exports.confirmarCuenta = async(req, res)=>{
     res.json(req.params.correo);
 }