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

const searchIP = 


module.exports = {
    saveIP
}