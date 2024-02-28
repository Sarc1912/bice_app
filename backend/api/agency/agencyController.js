require('dotenv').config();
const pool = require('../../src/db/pool');
const { request, response } = require('express');
const { SignUser } = require("../functions/functions");

const States = (request, response) => {
    const {token, cargo, tipo_u} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    if(auth){
        pool.query("Select * from tbl_estado",(error, result)=>{
            if (error) {
                response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
            }else{
                response.status(200).json({estados:result.rows})
            }
        })
    }else{
        return response.status(401).json({ error: 'Su usuario no tiene suficientes privilegios para realizar esta acción' });
    }
}

const municipalities = (request, response) => {
    const {token, cargo, tipo_u, state} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    if(auth){
        pool.query("Select * from tbl_municipios where estado = $1", [state],(error, result)=>{
            if (error) {
                response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
            }else{
                response.status(200).json({municipios:result.rows})
            }
        })
    }else{
        return response.status(401).json({ error: 'Su usuario no tiene suficientes privilegios para realizar esta acción' });
    }
}

module.exports = {
    States,
    municipalities
}