const pool = require('../../src/db/pool');

const { request, response } = require('express');

const getDevices = (request, response) => {
    pool.query("SELECT * FROM public.tbl_datos_dispositivos", (error, results) =>{
        if(error){
            console.log(error)
            throw error
        }
        response.status(200).json(results.rows)
    })
}

module.exports ={
    getDevices
}