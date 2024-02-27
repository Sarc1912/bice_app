require('dotenv').config();
const pool = require('../../src/db/pool');
const { request, response } = require('express');
const { SignUser } = require("../functions/functions");

const GetAllUsers = (request, response)=>{
    const {token, cargo, tipo_u} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    if (auth) {
        pool.query("SELECT u.usuario, u.correo, e.descr_estatus AS estatus, t.descr_tipo_usuario AS tipo_usuario, c.descr_cargo AS cargo, a.descr_area AS area FROM public.tbl_usuarios AS u INNER JOIN public.tbl_estatus_usuario AS e ON u.estatus_usuario = e.cod_estatus_usuario INNER JOIN public.tbl_tipo_usuario AS t ON u.tipo_usuario = t.id_tipo_usuario INNER JOIN public.tbl_cargos AS c ON u.cargo = c.id_cargo INNER JOIN public.tbl_areas AS a ON u.area = a.id_area", (error, result) =>{
            if(error){
                response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
            }else{
                const users = result.rows
                response.status(200).json({ users: users });
            }
        })
    }else{
        return response.status(401).json({ error: 'Su usuario no tiene suficientes privilegios para realizar esta acción' });
    }
}

const Cargo = (request, response)=>{
    const {token, cargo, tipo_u} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    if(auth){
        pool.query("Select * from tbl_cargos",(error, result)=>{
            if (error) {
                response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
            }else{
                response.status(200).json({cargos:result.rows})
            }
        })
    }else{
        return response.status(401).json({ error: 'Su usuario no tiene suficientes privilegios para realizar esta acción' });
    }
}

const TipoUsuario = (request, response)=>{
    const {token, cargo, tipo_u} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    if(auth){
        pool.query("Select * from tbl_tipo_usuario",(error, result)=>{
            if (error) {
                response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
            }else{
                response.status(200).json({type_u:result.rows})
            }
        })
    }else{
        return response.status(401).json({ error: 'Su usuario no tiene suficientes privilegios para realizar esta acción' });
    }
}

module.exports = {
    GetAllUsers,
    Cargo,
    TipoUsuario
}