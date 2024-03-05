require('dotenv').config();
const pool = require('../../src/db/pool');
const { request, response } = require('express');
const bcrypt = require("bcryptjs");

const searchAllIncidences = (request, response) => {
    pool.query("SELECT * FROM public.tbl_incidencias", (err, res)=>{
        try {
            response.status(200).json({data:res.rows})
        } catch (err) {
            response.status(400).json({error:"No se ha podido completar su solicitud", errMes:err})
        }
    })
}

const changeStatusIncidence = (request, response) =>{

}

const countActiveIncidences = (request, response) => {

}


module.exports = {
    searchAllIncidences,
    changeStatusIncidence,
    countActiveIncidences
}