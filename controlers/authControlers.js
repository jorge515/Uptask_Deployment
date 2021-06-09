const passport= require('passport');
const Usuarios=require('../models/Usuarios');
const Sequelize = require('sequelize');
const Op=Sequelize.Op;
const crypto = require('crypto');
const bcrypt = require(' bcrypt-nodejs');
const enviarEmail= require('../handler/mail');


exports.autenticarUsuario=passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect:'/iniciar-sesion',
    failureFlash:true,
    badRequestMessage: 'Ambos Campos son Obligatorios'
});
exports.usuarioAutenticado=(req,res,next)=>{
     if(req.isAuthenticated()){
         return next();
     }
     return res.redirect('/iniciar-sesion');
}
// funcion para cerrar sesion
exports.cerrarSesion=(req, res)=>{
    req.session.destroy(()=>{
        res.redirect('/iniciar-sesion');
    })
}
//Generar n token si es valido

exports.enviarToken=async(req,res)=>{
    const {email}= req.body
    
    const usuario=await Usuarios.findOne({where : { email: req.body.email}});

    if(!usuario){
        req.flash('error','No existe esea cuenta');
        res.rendirect('reestablecer');
    }
    //usuario existe

    usuario.token=crypto.randomBytes(20).toString('hex');
    usuario.expiracion=Date.now() + 3600000;

    await usuario.save();

    const resetUrl= `http://${req.headers.host}/reestablecer/${usuario.token}`;

}

await enviarEmail.enviar({
    usuario,
    subjet:'Password Reset',
    resetUrl,
    archivo:'reestablecer-password'
});

// terminar el envio
req.flash('correcto', 'Se envio un mensaje a tu correo');
res.redirect('/iniciar-sesion');

exports.validarToken =async(req,res)=>{
   const usuario= await Usuarios.findOne({
       where:{
           token:req.params.token
       }
   });
   if(!usuario){
       req.flash('error','No valido');
       res.redirect('/reestablecer');

   }
   //Formuaro para genera pass

   res.render('resetPassword',{
       nombrePagina:'Reestablecer Contraseña'
   })
}

exports.actualizarPassword = async(req, res)=>{
    const usuario = await Usuarios.findOne({
        where:{
            token:req.params.token,
            expiracion:{
                [Op.gte]: Date.now()
            }
        }
    });

    if(!usuario){
        req.flash('error','No Valido');
        res.redirect('/reestablecer');
    }
    //hashear el nuevo password
    usuario.password=bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    usuario.token=null;
    usuario.expiracion=null;

    //guardamos el nuevo pasword
    await usuario.save();
    req.flash('correcto','Tu password se ha modificado correctamente');
    res.redirect('/iniciar-sesion');
}