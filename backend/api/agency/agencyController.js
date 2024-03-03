require('dotenv').config();
const pool = require('../../src/db/pool');
const { request, response } = require('express');
const { SignUser } = require("../functions/functions");


const Agencies = (request, response) => {

    const {token, cargo, tipo_u} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    if(auth){
        pool.query('SELECT  tbl_datos_agencias.id_agencia, tbl_datos_agencias.nombre_agencia, tbl_datos_agencias.cod_oficina, tbl_estatus_agencia.descr_estatus_agencia, tbl_direccion_agencias.direccion, tbl_ext_oficina.extensionn FROM  public.tbl_datos_agencias LEFT JOIN public.tbl_estatus_agencia ON tbl_datos_agencias.estatus_agencia = tbl_estatus_agencia.id_estatus_agencia LEFT JOIN public.tbl_direccion_agencias ON tbl_datos_agencias.direccion_agencia = tbl_direccion_agencias.id_direccion LEFT JOIN public.tbl_ext_oficina ON tbl_datos_agencias.ext_agencia = tbl_ext_oficina.extensionn;', (error, result)=>{
            if (error){
                response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.' });
            }else{
                response.status(200).json({agencias:result.rows})
            }
        } )
    }else{
        return response.status(401).json({ error: 'Su usuario no tiene suficientes privilegios para realizar esta acción' });
    }
}

const resumeAgency =(request, response) =>{
    pool.query('select * from tbl_datos_agencias', (error, res)=>{
        try {
            response.status(200).json({data:res.rows});
        } catch (error) {
            response.status(500).json({error:"Ha ocurrido un error, Intente más tarde"});
        }
    })
}

const addAgency = async (request, response) =>{
    const {token, cargo, tipo_u, state, mun, place, name, cod, ext, extComp} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    let firstResp;
    let secResp;

    if(auth){
        try {
            firstResp = await pool.query('INSERT INTO public.tbl_direccion_agencias (direccion, localizacion, estado, municipio) VALUES ($1, $2, $3, $4) RETURNING *', [place, place, state, mun]);
        } catch (error) {
            response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.', errorMsg: error });
        }
    if (firstResp.rows.length > 0) {
        try{
            secResp = await pool.query('INSERT INTO public.tbl_ext_oficina(extensionn, ext_completa) VALUES ($1, $2) RETURNING *', [ext, extComp] )
        }catch (error) {
            response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.', errorMsg: error });
        }

        try {
            pool.query(`INSERT INTO public.tbl_datos_agencias(
                estatus_agencia, direccion_agencia, nombre_agencia, ext_agencia, cod_oficina)
                VALUES (1, $1, $2, $3, $4);`, [firstResp.rows[0].id_direccion, name, secResp.rows[0].extensionn, cod])
                response.status(200).json({msg:"Su agencia se ha registrado con éxito."})
        } catch (error) {
            response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.', errorMsg: error });
    }

    } 
} else {
return response.status(401).json({ error: 'Su usuario no tiene suficientes privilegios para realizar esta acción' });
}
}

const changeStatusAgency = (request, response) => {
    const {id_agencia, status} = req.body

    let update;

    (status === 1) ? update = 2 : update = 1

    pool.query = (`UPDATE public.tbl_datos_agencias
	SET id_agencia=$2 WHERE id_agencia=$1`, [id_agencia, update])

}

const searchAgency = (request, response) => {
    const { id_agencia } = request.body;

    pool.query(`SELECT 
    tbl_datos_agencias.id_agencia,
    tbl_datos_agencias.nombre_agencia,
    tbl_datos_agencias.cod_oficina,
    tbl_datos_agencias.direccion_agencia,
    tbl_estatus_agencia.descr_estatus_agencia,
    tbl_direccion_agencias.direccion,
    tbl_direccion_agencias.estado,
    tbl_direccion_agencias.municipio,

    tbl_ext_oficina.extensionn
FROM 
    public.tbl_datos_agencias
LEFT JOIN 
    public.tbl_estatus_agencia ON tbl_datos_agencias.estatus_agencia = tbl_estatus_agencia.id_estatus_agencia
LEFT JOIN 
    public.tbl_direccion_agencias ON tbl_datos_agencias.direccion_agencia = tbl_direccion_agencias.id_direccion
LEFT JOIN 
    public.tbl_ext_oficina ON tbl_datos_agencias.ext_agencia = tbl_ext_oficina.extensionn
WHERE
    tbl_datos_agencias.id_agencia = $1`, [parseInt(id_agencia)], (error, result)=>{
        try{
            if (result.rows.length > 0) {
                response.status(200).json({resp: result.rows})
            } else{
                response.status(500).json({error: 'Ha ocurrido un error, intente mas tarde.', error:error})
            }
        }catch (error) {
            response.status(500).json({error: 'Ha ocurrido un error, intente mas tarde.', error:error})
        }
    })
}

const updAgency = async (request, response) => {
    const { id_agencia ,token, cargo, tipo_u, state, mun, place, name, cod, ext, extComp, direccion} = request.body;
    const auth = SignUser(token, cargo, tipo_u)

    let firstResp;
    let secResp;

    if(auth){
        try {
            firstResp = await pool.query('UPDATE public.tbl_direccion_agencias SET direccion = $1, localizacion = $2, estado = $3, municipio = $4 WHERE id_direccion = $5 RETURNING *', [place, place, state, mun, direccion]);
        } catch (error) {
            console.log(error)
            response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.', errorMsg: error });
        }
    if (firstResp.rows.length > 0) {
        try{
            secResp = await pool.query('UPDATE public.tbl_ext_oficina SET extensionn = $1, ext_completa = $2 WHERE extensionn = $1 RETURNING *', [ext, extComp])

        }catch (error) {
            console.log(error)

            response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.', errorMsg: error });
        }

        try {
            pool.query(`UPDATE public.tbl_datos_agencias
            SET estatus_agencia = 1, direccion_agencia = $1, nombre_agencia = $2, ext_agencia = $3, cod_oficina = $4
            WHERE id_agencia = $5;`, [firstResp.rows[0].id_direccion, name, secResp.rows[0].extensionn, cod, id_agencia])
                response.status(200).json({msg:"Su agencia se ha registrado con éxito."})
        } catch (error) {
            console.log(error)

            response.status(500).json({ error: 'Ha ocurrido un error, intente mas tarde.', errorMsg: error });
    }

    } 
} else {
return response.status(401).json({ error: 'Su usuario no tiene suficientes privilegios para realizar esta acción' });
}
}

const States = (request, response) => {
    const {token, cargo, tipo_u, } = request.body;
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
    Agencies,
    resumeAgency,
    searchAgency,
    updAgency,
    States,
    municipalities,
    addAgency
}