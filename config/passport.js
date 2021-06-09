const passport =require('passport');
const LocalStrategy= require('passport-local').Strategy;

//referencia al modelo donde vamos a autenticar
const Usuarios=require('../models/Usuarios');
//local Strategy -Login con credenciales propias
passport.use(  
    new LocalStrategy(
        {
            usernameField:'email',
            passwordField:'password'
        },
        async (email,password, done) =>{
            try{
                const usuario= await Usuarios.findOne({
                    where:{ email:email}
                });
                //El usuario existe ,password incorrecto
                if(!usuario.verificarPassword(password)){
                    return done(null,false,{
                        message: 'Password Incorrecto'
                    })

                }
                // El mail existe, y es password correcto
                return done(null,usuario);

            }catch (error){
                return done(null,false,{
                    message: 'Esa cuenta no existe'
                })
            }
        }
    )
);
// serializar el usuario que es un objeto
passport.serializeUser((usuario, callback)=>{
    callback(null,usuario);
})

// deserializar el usuario
passport.deserializeUser((usuario,callback)=>{
    callback(null,usuario);
});

module.exports= passport;
