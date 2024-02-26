require('dotenv').config();
const pool = require('../../src/db/pool');
const { request, response } = require('express');
const bcrypt = require("bcryptjs");



const jwt = require('jsonwebtoken');

const login = (request, response) => {
    const { username, password } = request.body;
  
    pool.query('SELECT u.usuario, u.correo, u.clave, e.descr_estatus AS estatus, t.descr_tipo_usuario AS tipo_usuario, c.descr_cargo AS cargo, a.descr_area AS area FROM public.tbl_usuarios AS u INNER JOIN public.tbl_estatus_usuario AS e ON u.estatus_usuario = e.cod_estatus_usuario INNER JOIN public.tbl_tipo_usuario AS t ON u.tipo_usuario = t.id_tipo_usuario INNER JOIN public.tbl_cargos AS c ON u.cargo = c.id_cargo INNER JOIN public.tbl_areas AS a ON u.area = a.id_area WHERE correo = $1', [username], (error, results) => {
      if (error) {
        throw error;
      }
        if (results.rows.length > 0) {
        const user = results.rows[0];  
        // Aquí deberías verificar la contraseña del usuario. Esto es solo un ejemplo.

        if(user.estatus === "Activo"){
        bcrypt.compare(password, user.clave, function(err, result) {
          if(result) {
            let token = jwt.sign(request.body, process.env.JWT_SECRET)

            const userData = {
              correo:user.correo,
              usuario: user.usuario,
              estatus: user.activo,
              tipoUsuario: user.tipo_usuario,
              cargo: user.cargo,
              area: user.area
            }
  
            response.status(200).json({
              userData: userData,
              token:token
            })
            
          } else {
            response.status(401).json({ error: 'Contraseña incorrecta.' });
          }
      });
        }else{
          response.status(401).json({ error: 'Su usuario se encuentra deshabilitado.' });
        }
        } else {
          response.status(404).json({ error: 'Usuario no encontrado.' });
        }
    });
  };

  const register = (request, response) => {
    const {user, mail, pass} = request.body;
  
    const rondasDeSal = 10;
    bcrypt.hash(pass, rondasDeSal, (err, pass) => {
      if (err) {
        response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
      }
      pool.query(`INSERT INTO public.tbl_usuarios(
        estatus_usuario, correo, clave, tipo_usuario, cargo, usuario, area)
        VALUES ($1, $2, $3, $4, $5, $6, $7);`, [1, user, pass, 3, 3, mail, 3], (error, results) => {
        if (error) {
          if (error.constraint === 'pk_tbl_usuarios') {
            response.status(400).json({ error: 'El usuario ya existe.' });
          } else {
            response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
          }
        } else {
          if (results.rows.length > 0) {
            response.status(404).json({ error: 'No se ha podido registrar el usuario.' });
          } else {
            response.status(200).json({data:"ok"})
          }
        }
      });
    });
  };
  
  


module.exports = {
    login,
    register
}