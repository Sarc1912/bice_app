require('dotenv').config();
const pool = require('../../src/db/pool');
const { request, response } = require('express');
const { SignUser } = require("../functions/functions");

const saveIP = (request, response) =>{
    const {dir_ip, cod_disp} = request.body

    pool.query(`INSERT INTO public.tbl_direcciones_ip(
        datos_ip, cod_dispositivo, estatus)
        VALUES ($1, $2, $3);`, [dir_ip, cod_disp, 1], (error, result)=>{
            try {
                response.status(200).json({msg:"Se ha registrado su dirección IP conrrectamente."})
            } catch (error) {
                console.log(error)
                response.status(500).json({error:"Ha ocurrido un error, por favor intente más tarde"})
            }
        } )
}

const searchIP = (request, response) =>{
    pool.query("SELECT * FROM tbl_direcciones_ip", (error, result)=>{
            try {
                response.status(200).json({msg:result.rows})
            } catch (error) {
                response.status(500).json({error:"Ha ocurrido un error, por favor intente más tarde"})
            }
        } )
}

const searchIPAgency = (request, response) =>{

    const {id_disp} = request.body

    pool.query("SELECT * FROM tbl_direcciones_ip WHERE cod_dispositivo = $1", [id_disp] ,(error, result)=>{
            try {
                console.log(result)
                response.status(200).json({msg:result.rows})
            } catch (error) {
                response.status(500).json({error:"Ha ocurrido un error, por favor intente más tarde"})
            }
        } )
}

const searchDisabledIP = (request, response) =>{
    pool.query("SELECT * FROM tbl_direcciones_ip where estatus = $1", [2], (error, result)=>{
            try {
                response.status(200).json({msg:result.rows})
            } catch (error) {
                response.status(500).json({error:"Ha ocurrido un error, por favor intente más tarde"})
            }
        } )
}

const EditIp = (request, response) =>{
    pool.query("")
}


module.exports = {
    saveIP,
    searchIP,
    EditIp,
    searchIPAgency,
    searchDisabledIP
}