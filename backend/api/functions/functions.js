require('dotenv').config();
const pool = require('../../src/db/pool');

const SignUser = (token, cargo, tipo_u) => {
    // && cargo === "Gerente de Telecomunicaciones" && (tipo_u === "Gerente" || tipo_u === "Administrador")
    if (token  ) {
        return true;
    }else{
        return false;
    }
}

module.exports = {
    SignUser
}