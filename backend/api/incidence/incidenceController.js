require('dotenv').config();
const pool = require('../../src/db/pool');
const { request, response } = require('express');
const bcrypt = require("bcryptjs");

const searchAllIncidences = (request, response) => {
    pool.query(`SELECT 
    i.id_incidencia,
    i.descr_incidencia AS descr_incidencia_i,
    i.fecha,
    ip.direccion_ip,
	ip.datos_ip,
    e.cod_estatus_incidencia,
    e.descr_incidencia AS descr_incidencia_e
FROM 
    public.tbl_incidencias AS i
JOIN 
    public.tbl_direcciones_ip AS ip ON i.ip = ip.direccion_ip
JOIN 
    public.tbl_estatus_incidencias AS e ON i.estatus = e.cod_estatus_incidencia;
`, (err, res)=>{
        try {
            response.status(200).json({data:res.rows})
        } catch (err) {
            response.status(400).json({error:"No se ha podido completar su solicitud", errMes:err})
        }
    })
}


const changeStatusIncidence = (request, response) =>{

    const {id_incidencia, estatus} = request.body


    pool.query(`UPDATE public.tbl_incidencias
	SET estatus=$2
	WHERE id_incidencia = $1;`, [id_incidencia, estatus],(err, res)=>{
        try {
            response.status(200).json({data:res.rows})
        } catch (err) {
            response.status(400).json({error:"No se ha podido completar su solicitud", errMes:err})
        }
    })
}

const countActiveIncidences = (request, response) => {

}


module.exports = {
    searchAllIncidences,
    changeStatusIncidence,
    countActiveIncidences
}