require('dotenv').config();
const pool = require('../../src/db/pool');

const SignUser = (token, cargo, tipo_u) => {
    if (token && cargo === "Gerente" && (tipo_u === "Gerente" || tipo_u === "Administrador") ) {
        return true;
    }else{
        return false;
    }
}


module.exports = {
    SignUser
}