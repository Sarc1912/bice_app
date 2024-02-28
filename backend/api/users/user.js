require('dotenv').config();
const pool = require('../../src/db/pool');
const { request, response } = require('express');
const { SignUser } = require("../functions/functions");

const GetAllUsers = (request, response)=>{
    const {token, cargo, tipo_u} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    if (auth) {
        pool.query("SELECT u.id_usuario, u.usuario, u.correo, e.descr_estatus AS estatus, t.descr_tipo_usuario AS tipo_usuario, c.descr_cargo AS cargo, a.descr_area AS area FROM public.tbl_usuarios AS u INNER JOIN public.tbl_estatus_usuario AS e ON u.estatus_usuario = e.cod_estatus_usuario INNER JOIN public.tbl_tipo_usuario AS t ON u.tipo_usuario = t.id_tipo_usuario INNER JOIN public.tbl_cargos AS c ON u.cargo = c.id_cargo INNER JOIN public.tbl_areas AS a ON u.area = a.id_area", (error, result) =>{
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

const UpdUser = (request, response)=>{
    const { tipo_u_admin, cargo_admin, token, id, name, mail,  typeU, cargo,  area, estatus} = request.body;
    const auth = SignUser(token, cargo_admin, tipo_u_admin)

    console.log(request.body)


    pool.query(`UPDATE public.tbl_usuarios
	SET estatus_usuario=$1, correo=$2, tipo_usuario=$3, cargo=$4, usuario=$5, area=$6
	WHERE id_usuario=$7;`, [estatus, mail, typeU, cargo, name, area, id], (error, results) => {
        console.log(results)

        if (error) {
          if (error.constraint === 'pk_tbl_usuarios') {
            response.status(400).json({ error: 'El usuario ya existe.' });
          } else {
            response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
          }
        } else {
          if (results.rowCount === 0) {
            response.status(404).json({ error: 'No se ha podido registrar el usuario.' });
          } else {
            response.status(200).json({data:"ok"})
          }
        }
      });

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

const Area = (request, response)=>{
    const {token, cargo, tipo_u} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    if(auth){
        pool.query("Select * from tbl_areas",(error, result)=>{
            if (error) {
                response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
            }else{
                response.status(200).json({areas:result.rows})
            }
        })
    }else{
        return response.status(401).json({ error: 'Su usuario no tiene suficientes privilegios para realizar esta acción' });
    }
}

module.exports = {
    GetAllUsers,
    Cargo,
    TipoUsuario,
    Area,
    UpdUser
}