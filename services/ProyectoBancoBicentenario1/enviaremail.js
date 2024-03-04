const nodemailer = require('nodemailer');
const tempoTranscurrido = Date.now();
//const { ip } = require('./index.js');
const fecha = new Date(tempoTranscurrido);
const hoy=fecha.toLocaleDateString();
const database = require ('./database/conexion.js');
const { google } = require('googleapis');
const OAuth2= google.auth.OAuth2;

//const activo=database.query("select * from tbl_incidencias where fecha!="+hoy);
//const data= activo;
//const data= activo;
const aaa= async (ip) =>{

        
const coddispositivo=await database.query("select cod_dispositivo from tbl_direcciones_ip where datos_ip='"+ip+"'");

const codagencia=await database.query("select id_agencia from tbl_datos_dispositivos where id_dispositivo='"+coddispositivo.rows[0].cod_dispositivo+"'");

const correoincidencia=await database.query("select correo from tbl_datos_contacto_agencia where id_agencia='"+codagencia.rows[0].id_agencia+"'");
const correofinal= correoincidencia.rows[0].correo;
console.log(correofinal)

const mailOptions = {
    from: 'alyera02@gmail.com',
    to: correofinal,
    subject: 'Prueba',
    text: 'CUIDADITO MIKE WAZOWSKI. CUIDADITO'
};

const mail_r = (callback) => {
    const oauth2Client = new google.auth.OAuth2(
        "973225464420-jhm96h04te65ddt4b4l1dok5vlol7eoi.apps.googleusercontent.com",
        "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",
        "https://developers.google.com/oauthplayground"
    );

    oauth2Client.setCredentials({
        refresh_token: "1//04HinCrizJt0gCgYIARAAGAQSNwF-L9IrsVabGV9ck9IKIy9fyIPAKMYYCDDUKDD5zgr01rVg8vbQy31UKVQV64-vWPAjDF0SRDI"
    });

    oauth2Client.getAccessToken((err, token) => {
        if (err) {
            console.error(err);
            return;
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'alyera02@gmail.com',
                accessToken: token
            }
        });

        callback(transporter);
    });
};

mail_r((transporter) => {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Correo enviado: ' + info.response);
        }
    });
});
}
module.exports = aaa;