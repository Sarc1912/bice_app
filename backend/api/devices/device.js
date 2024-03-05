const pool = require('../../src/db/pool');

const { request, response } = require('express');

const getDevices = (request, response) => {
    pool.query("SELECT d.id_dispositivo,d.nombre_dispositivo,f.fabricante,e.tipo_enlace,d.velocidad,d.tipo_dispositivo,ed.estaus_dispositivo FROM public.tbl_datos_dispositivos AS d JOIN public.tbl_fabricante AS f ON d.fabricante = f.id_fabricante JOIN public.tbl_tipo_enlace AS e ON d.tipo_enlace = e.cod_tipo_enlace JOIN public.tbl_estatus_dispositivo AS ed ON estatus = ed.cod_est_disp;", (error, results) =>{
        if(error){
            console.log(error)
            response.status(400).json(error)
        }
        console.log(results)
        response.status(200).json(results.rows)
    })
}


const addDevices = (request, response) => {
    const { tipo_u_admin, cargo_admin, token, disp, model, manufac, typelink, vel, estatus, id_agencia} = request.body

    pool.query("INSERT INTO public.tbl_datos_dispositivos(nombre_dispositivo, fabricante, tipo_enlace, velocidad, tipo_dispositivo, estatus, id_agencia)VALUES ($1, $2, $3, $4, $5, $6, $7);", [disp, manufac, typelink, vel, model, estatus, id_agencia ],  (error, results) =>{
        if(error){
            console.log(error)
            response.status(400).json(error)
        }else{
            console.log(results.rows)
            response.status(200).json({msg:"Su dispositivo se ha registrado satisfactoriamente."})
        }

    })
}

const editDevices = (request, response) => {
const { id_disp, disp, model, manufac, typelink, vel, estatus, id_agencia} = request.body

    pool.query(`UPDATE public.tbl_datos_dispositivos
	SET  nombre_dispositivo=$2, fabricante=$3, tipo_enlace=$4, velocidad=$5, tipo_dispositivo=$6, estatus=$7, id_agencia=$8 WHERE id_dispositivo=$1 ;`, [id_disp, disp, manufac, typelink, vel, model, estatus, id_agencia ],  (error, results) =>{
        if(error){
            console.log(error)
            response.status(400).json(error)
        }else{
            console.log(results.rows)
            response.status(200).json({msg:"Su dispositivo se ha actualizado satisfactoriamente."})
        }

    })
}

const getManufacturer = (request, response) => {
    pool.query("SELECT * FROM public.tbl_fabricante", (error, results) =>{
        if(error){
            response.status(400).json(error)
        }else{
            response.status(200).json(results.rows)
        }
    })
}

const typeLink = (request, response) => {
    pool.query("SELECT * FROM public.tbl_tipo_enlace", (error, results) =>{
        if(error){
            response.status(400).json(error)
        }else{
            response.status(200).json(results.rows)
        }
    })
}

const getCompDevice = (request, response) => {

    const {id_dispositivo} = request.body;

    pool.query("SELECT * FROM public.tbl_datos_dispositivos WHERE id_dispositivo = $1", [id_dispositivo], (err, res)=>{
        if(err){
            response.status(400).json(err)
        }else{
            response.status(200).json(res.rows[0])
        }
    })
}

module.exports ={
    getDevices,
    getManufacturer,
    typeLink,
    addDevices,
    getCompDevice,
    editDevices
}