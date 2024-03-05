"use client"

import React, { useEffect, useState } from 'react'
import Links from './components/Links'
import Graph from './components/Graph'
import { faArrowDown, faBuildingColumns, faUser } from '@fortawesome/free-solid-svg-icons'

function Dashboard() {
  const [down, setDown] = useState("")
  const [user, setUser] = useState("")
  const [agencies, setAgencies] = useState("")

  useEffect(()=>{
    const getData = async () =>{
      try {
        const res = await fetch("http://localhost:3001/countActiveIncidences",{
        method:'POST',
        headers: {
        'Content-Type': 'application/json',
        },
      })
        const data = await res.json();
        console.log(data)
        setDown(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const loadUsers = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/users/",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo_u: userData.tipoUsuario,
          cargo: userData.cargo,
          token: token,
        }),
      });

      const data = await res.json();
      setUser(data.users.length);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    const loadAgencies = async () => {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3001/agencies/",{
        method:'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tipo_u: userData.tipoUsuario,
          cargo: userData.cargo,
          token: token,
        }),
      });

      const data = await res.json();
      setAgencies(data.agencias.length);
    };

    loadAgencies();
  }, []);


  const links = [
    {
      icon: faArrowDown,
      color: "#00618B",
      link:"Incidencias Activas",
      down:down.data,
    },
    {
      icon: faUser,
      color:"#73219D",
      link:"Usuarios Registrados",
      down:user,
    },
    {
      icon: faBuildingColumns,
      color:"#FF6300",
      link:"Agencias Registradas",
      down:agencies,
    },
  ]


  return (
<>
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      <Links links={links} />
      </div>
      
      <Graph />

      </div>

  
</>
  )
}

export default Dashboard