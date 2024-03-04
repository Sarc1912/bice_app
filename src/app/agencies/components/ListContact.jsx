"use client"
import React, { useState } from 'react'

function ListContact({contacts}) {

  console.log(contacts)

  const [names, setNames] = useState("")
  const [lastnames, setLastNames] = useState("")
  const [mail, setMail] = useState("")
  const [ci, setCi] = useState("")
  const [cel1, setCel1] = useState("")
  const [cel2, setCel2] = useState("")
  const [ext, setExt] = useState("")
  const [isLoading, setIsLoading] = useState("")

  const handleChange = (event, setter) => {
    const value = event.target.value;
    if (/^\d*$/.test(value)) {
      setter(value);
    }
};

const handleSubmit = () =>{

}


  return (
    contacts.map((contact)=>(
      <form class="flex" onSubmit={handleSubmit}>
      <input onChange={(e) => setNames(e.target.value)} value={names} maxLength="50" class="rounded border focus:border-red-700 focus:shadow-md m-1" type="text" placeholder="Nombres" required style={{ width:"200px" }} />
      <input onChange={(e) => setLastNames(e.target.value)} value={lastnames} maxLength="25" class="rounded border focus:border-red-700 focus:shadow-md m-1" type="text" placeholder="Apellidos" required style={{ width:"200px" }} />
      <input onChange={(e) => setMail(e.target.value)} value={mail} maxLength="25" class="rounded border focus:border-red-700 focus:shadow-md m-1" type="email" placeholder="Correo" required style={{ width:"200px" }} />
      <input onChange={(e)=>handleChange(e, setCi)} value={ci} maxLength="8" class="rounded border focus:border-red-700 focus:shadow-md m-2 p-2" type="text" placeholder="Cedula" required style={{ width:"100px" }} />
      <input onChange={(e)=>handleChange(e, setCel1)} value={cel1} maxLength="11" class="rounded border focus:border-red-700 focus:shadow-md m-2 p-2 " type="text" placeholder="Celular 1" required style={{ width:"130px" }} />
      <input onChange={(e)=>handleChange(e, setCel2)} value={cel2} maxLength="11" class="rounded border focus:border-red-700 focus:shadow-md m-2 p-2 " type="text" placeholder="Celular 2" style={{ width:"130px" }} />
      <input onChange={(e)=>handleChange(e, setExt)} value={ext} maxLength="6" class="rounded border focus:border-red-700 focus:shadow-md m-2 p-2 " type="text" placeholder="Extension de oficina"  required style={{ width:"90px" }}/>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isLoading} type="submit">
        {isLoading ? "Cargando..." : "Guardar"}
      </button>
    </form>
    ))
  )
}

export default ListContact