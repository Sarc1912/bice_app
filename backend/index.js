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
const IP = require("./api/IP/IPcontroller")
const contact = require("./api/contacAgency/contactAgencyController")

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
app.post("/devices", device.getDevices);
app.post("/users/", user.GetAllUsers);
app.post("/cargos/", user.Cargo );
app.post("/type_u/", user.TipoUsuario );
app.post("/areas/", user.Area );
app.post("/updUsers/", user.UpdUser );

app.post('/agencies', agency.Agencies);
app.post('/resumeAgency', agency.resumeAgency);
app.post('/addAgencies', agency.addAgency )
app.post('/searchAgency/', agency.searchAgency);
app.post('/updAgency', agency.updAgency);
app.post('/changeStatusAgency/')

app.post("/states/", agency.States);
app.post("/municipalities/", agency.municipalities);


app.post("/addDevices/", device.addDevices);
app.post("/typeLink/", device.typeLink);
app.post("/manufacturer/", device.getManufacturer);
app.post("/getCompDevice/", device.getCompDevice)
app.post("/editDevice/", device.editDevices)

app.post("/searchIP/", IP.searchIP)
app.post("/saveIP/", IP.saveIP);

app.post("/contacts", contact.viewContact)
app.post("/saveContact/", contact.saveContact)
app.post("/updContact/", contact.editContact)
app.post("/delContact/", contact.delContact)



//EndRoutes