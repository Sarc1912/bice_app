
const { Pool } = require('pg')
const connectionData = new Pool({
    user: 'postgres',
    host: '127.0.0.1',
    password: 'root',
    database: 'db_bice',
    port: 5433
  })

//const Ptsql = new Client(connectionData)
//console.log(connectionData);
module.exports = connectionData;


