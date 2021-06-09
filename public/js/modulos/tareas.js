import axios from "axios";
import Swal from 'sweetalert2';

import {actualizarAvance} from '../funciones/avances';

const tareas = document.querySelector('.listado-pendientes');

if(tareas){
   tareas.addEventListener('click', e =>{
       //console.log(e.target.classList);
       if (e.target.classList.contains('fa-check-circle')){
           // console.log('Actualizano....');
           const icono= e.target;
           const idTarea= icono.parentElement.parentElement.dataset.tarea;
           // request hacia/tareas:/id
           const url= `${location.origin}/tareas/${idTarea}`;
           axios.patch(url ,{idTarea})
               .then(function(respuesta){
                  if(respuesta.status===200){
                      icono.classList.toogle('completo');
                      actualizarAvance();
                  }
               })
       }
       if (e.target.classList.contains('fa-trash')){
           const tareaHTML= e.target.parentElements.parentElement;
                 idTarea=tareaHTML.dataset.tarea;
                
                 Swal.fire({
                    title:'Deseas borrar esta Tarea?',
                    text:"Una Tarea eliminada no se puede recuperar!",
                    type:"warning",
                    showCancelButton:true,
                    confirmButtonColor:'#3085d6',
                    cancelButtonColor:'#d33',
                    confirButtonText:'Si, Borrar!',
                    cancelButton:'No, Cancelar'
               }).then((result)=>{
                   if (result.value){
                    const url= `${location.origin}/tareas/${idTarea}`;
                    // enviar delete por medio de axios
                    axios.delete(url ,{params :{idTarea}})
                       .then(function(respuesta){
                           if(respuesta.status===200){
                               tareaHTML.parentElement.removeChild(tareaHTML);
                               //opcional una alerta
                               Swal.fire(
                                   'Tarea Eliminada',
                                   respuesta.data,
                                   "success"
                               )
                               actualizarAvance();
                           }

                       });
                       
                   }
               })

       }
   });
}

export default tareas;