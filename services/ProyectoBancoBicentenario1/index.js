const ping = require('ping');
const database = require ('./database/conexion.js');
const enviaremail = require ('./enviaremail.js');
const tempoTranscurrido = new Date();
const fecha = new Date(tempoTranscurrido);
const hoy=fecha.toLocaleDateString();
// Dirección IP del dispositivo que quieres verificar
//const dispositivoIP = '192.168.0.101';

async (request,response) =>{

        
    // databaseint.end();
    // console.log(ganadero.rows);

};

const verificarConexion= async (request,response) =>{
    try{
        const result  =await database.query("SELECT * FROM tbl_direcciones_ip");
            //const array= data;
        //console.log(dataa.rows);
        result.rows.forEach(fila => {
            //console.log(fila.datos_ip);
            ping.sys.probe(fila.datos_ip, async function(isAlive){
                if (isAlive) { 
                    //console.log(fila.datos_ip);
                    const activo=await database.query("UPDATE tbl_direcciones_ip set estatus='1' where datos_ip='"+fila.datos_ip+"'");
                } else {
                    const validacion=await database.query("select * from tbl_incidencias where ip='"+fila.direccion_ip+"'");
                    //console.log(validacion);
                    if (validacion.rowCount!=0){
                        const activo=await database.query("UPDATE tbl_direcciones_ip set estatus='2' where datos_ip='"+fila.datos_ip+"'");
                    }else{
                        const activo=await database.query("UPDATE tbl_direcciones_ip set estatus='2' where datos_ip='"+fila.datos_ip+"'");
                        const ganadero=await database.query("Insert into tbl_incidencias (descr_incidencia,estatus,ip) VALUES ('Dispositivo Desconectado',1,'"+fila.direccion_ip+"');");
                        console.log('El dispositivo no está conectado.'); 
                        //const myVariable = x.datos_ip;
                        //module.exports.ip = myVariable;
                    //    enviaremail(fila.datos_ip)
                    }
                }
            })
            //console.log(fila);
        });
    }catch (error) {
        console.error("Error durante la consulta:", error);
        response.status(500).json({ error: "Error durante la consulta" });
    }
    

}
setInterval(verificarConexion, 5000);