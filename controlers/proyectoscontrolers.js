//const { noExtendLeft } = require('sequelize/types/lib/operators');
const Proyectos =require('../models/Proyectos');
const Tareas= require('../models/tareas');
//const slug = require('slug');



exports.proyectosHome = async (req, res)=>{
    const usuarioId =res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where :{usuarioId}});
    
    res.render('index',{
        nombrePagina:'Proyectos ' ,
        proyectos
    });
    // lo de arriba es la vista
}
exports.formularioProyecto= async (req,res)=>{
    const usuarioId =res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where :{usuarioId}});

    res.render('nuevoProyecto',{
        nombrePagina:'Nuevo Proyecto',
        proyectos

    })
}
exports.nuevoProyecto = async (req, res)=>{
    //res.send('Enviaste el Formulario');
    const usuarioId =res.locals.usuario.id;
    const proyectos = await Proyectos.findAll({where :{usuarioId}});

const nombre=req.body.nombre;
let errores=[];
if (!nombre){
    errores.push({'texto':'Agrega un Nombre al Proyecto'})
}
// si hay errores
if (errores.length > 0){
    res.render('nuevoProyecto', {
        nombrePagina:'Nuevo Proyecto',
        errores,
        proyectos
    })
}else{
    const usuarioId= res.locals.usuario.id;
    //const url =slug(nombre).toLowerCase();
    await Proyectos.create({nombre, usuarioId});
    res.redirect('/');

}}
exports.proyectoPorUrl= async (req,res,next)=>{
    const usuarioId =res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where :{usuarioId}});
    const proyectosPromise= Proyectos.findOne({
        where:{
            url : req.params.url,
            usuarioId
        }
    });
    const [proyectos,proyecto]= await Promise.all([proyectosPromise, proyectoPromise]);

    // Consultar tareas del Proyecto actual
    //console.log(proyecto);
    const tareas = await Tareas.findAll({
        where:{
            proyectoId:proyectoId
        },
        //incluide:[
         //   {model:Proyectos}
        //]
    });

    if(!proyecto) return next();
    //console.log(proyecto);
    res.render('tareas',{
      nombrePagina : 'Tareas del Proyecto',
      proyecto,
      proyectos,
      tareas
})
}
exports.formularioEditar=async (req, res)=>{
    const usuarioId =res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where :{usuarioId}});


       const proyectoPromise =  Proyectos.findOne({
           where:{
               id: req.params.id,
               usuarioId
           }
       });
       const [proyectos,proyecto]= await Promise.all([proyectosPromise, proyectoPromise]);
       
    // render a la vista
    res.render('nuevoProyecto',{
        nombrePagina:'Editar Proyecto',
        proyectos,
        proyecto
    })
}
exports.ActualizarProyecto = async (req, res)=>{
    const usuarioId =res.locals.usuario.id;
    const proyectosPromise = Proyectos.findAll({where :{usuarioId}});

const nombre=req.body.nombre;
let errores=[];
if (!nombre){
    errores.push({'texto':'Agrega un Nombre al Proyecto'})
}
// si hay errores
if (errores.length > 0){
    res.render('nuevoProyecto', {
        nombrePagina:'Nuevo Proyecto',
        errores,
        proyectos
    })
}else{
    //const url =slug(nombre).toLowerCase();
    await Proyectos.update(
        {nombre:nombre},
        { where: {id: req.params.id}}
    );
    res.redirect('/');

}}
exports.eliminarProyecto = async (req, res ,next)=> {
    //console.log(req.query);
    const {urlProyecto}=req.query;
    const resultado =await Proyectos.destroy({where:{url: urlProyecto}});
    if(!resultado){
        return next();
    }
   

res.status(200).send('Proyecto Eliminado Correctamente');
}