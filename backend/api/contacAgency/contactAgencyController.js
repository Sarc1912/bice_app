require('dotenv').config();
const pool = require('../../src/db/pool');
const { request, response } = require('express');
const bcrypt = require("bcryptjs");

const viewContact = (request, response) => {
    const {id_agencia} = request.body

    pool.query(`SELECT * FROM public.tbl_datos_contacto_agencia WHERE id_agencia = $1`, [id_agencia], (error, resp)=>{
        try {
            response.status(200).json({data:resp.rows})
        } catch (error) {
            response.status(400).json({error:"No se ha podido completar su solicitud", errMes:error})
        }
    });

    
}

const saveContact = (request, response) => {
    const {names, lastNames,mail, ci, cel1, cel2, ext, id_a} = request.body

    pool.query(`INSERT INTO public.tbl_datos_contacto_agencia(
    nombres, apellidos, cedula, telefono1, telefono2, extensiondca, id_agencia)
        VALUES ($1, $2, $3, $4, $5, $6, $7);`, [names, lastNames, ci, cel1, cel2, ext, id_a], (error, resp)=>{
            try {
                response.status(200).json({msg:"su contacto ha sido registrado correctamente"})
            } catch (error) {
                response.status(400).json({error:"No se ha podido completar su solicitud", errMes:error})
            }
        })
}

const editContact = (request, response) => {
    const {names, lastNames,mail, ci, cel1, cel2, ext, id_a, id_contacto} = request.body

    pool.query(`UPDATE public.tbl_datos_contacto_agencia
	SET nombres=$1, apellidos=$2, cedula=$3, telefono1=$4, telefono2=$5, extensiondca=$6
	WHERE id_contacto = $7;`, [names, lastNames, ci, cel1, cel2, ext, id_contacto], (error, resp)=>{
            try {
                response.status(200).json({msg:"su contacto ha sido actualizado correctamente"})
            } catch (error) {
                response.status(400).json({error:"No se ha podido completar su solicitud", errMes:error})
            }
        })
}

const delContact = (request, response) => {
    const {id_contacto} = request.body

    pool.query("DELETE FROM public.tbl_datos_contacto_agencia WHERE id_contacto = $1",[id_contacto], (error, resp)=>{
        try {
            console.log("si")
            console.log(resp)
            response.status(200).json({msg:"su contacto ha sido borrado correctamente"})
        } catch (error) {
            console.log("no")
            console.log(error)
            response.status(400).json({error:"No se ha podido completar su solicitud", errMes:error})
        }
    })
}

module.exports = {
    viewContact,
    saveContact,
    editContact,
    delContact
}
