const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3001

//Imports

const auth = require("./api/auth/authController")
const device = require("./api/devices/device")
const user = require("./api/users/user")
const agency = require("./api/agency/agencyController")

//EndImports
app.use(cors())
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

//Routes
app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })

app.post("/auth/login", auth.login);
app.post("/auth/register", auth.register);
app.get("/devices", device.getDevices);
app.post("/users/", user.GetAllUsers);
app.post("/cargos/", user.Cargo );
app.post("/type_u/", user.TipoUsuario );
app.post("/areas/", user.Area );
app.post("/updUsers/", user.UpdUser );
app.post("/states/", agency.States);
app.post("/municipalities/", agency.municipalities)

//EndRoutes