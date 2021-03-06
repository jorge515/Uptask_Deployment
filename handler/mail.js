const nodemailer = require('nodemailer');
const pug= require('pug');
const juice = require('juice');
const htmlToText= require('htlm-to-text');
const util= require('util');
const emailConfig=  require('../config/email');

let transporter = nodemailer.createTransport({
    host:emailConfig.host,
    port:emailConfig.port,
    
    auth:{
        user: emailConfig.user,
        pass: emailConfig.pass
    }
});
const generarHTML =(archivo,opciones ={})=>{
    const html =pug.renderFile(`${__dirname}/../views/email/${archivo}.pug`,opciones);
    return juice(html);

}
exports.enviar= async (opciones)=>{
    const html=generarHTML(opciones.archivo,opciones);
    const text=htmlToText.formString(html);
    

    let  opcionesEmail ={
        from:"Uptask <no-reply@uptask.com>",
        to: opciones.usuario.email,
        subject:opciones.subject,
        text,
        html
    };
   const enviarEmail= util.promisify(transport.sendMail,transport);
   return enviarEmail.call(transport, opcionesEmail)
}






