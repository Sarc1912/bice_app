"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'


function page() {
    const [user, setUser] = useState("")

    useEffect(() => {
        const userData = localStorage.getItem("userData")

      if (userData !== null) {
        setUser(JSON.parse(userData))
      }
    }, []);

    console.log(user)

  return (
<div>
   <div className="md:grid grid-cols-4 grid-rows-2  bg-white gap-2 p-4 rounded-xl">
        <div className="md:col-span-1 h-48 shadow-xl ">
                <div className="flex w-full h-full relative ml-5">
                <Image
                  src="/logos/user.png" // Ruta a tu imagen
                  alt="User"
                  width={200} // Ancho de la imagen
                  height={500} // Altura de la imagen
                />
                </div>
        </div>
        <div className="md:col-span-3 h-48 shadow-xl p-4 space-y-2 p-3">
                <div className="flex ">
                    <span
                        className="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6 text-black">Nombre:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6 text-black"
                        type="text" value={user.usuario}  readonly/>
                </div>
                <div className="flex ">
                    <span
                        className="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6 text-black">Correo:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6 text-black"
                        type="text" value={user.correo} readonly/>
                </div>
                 <div className="flex ">
                    <span
                        className="text-sm border bg-blue-50 font-bold uppercase border-2 rounded-l px-4 py-2 bg-gray-50 whitespace-no-wrap w-2/6 text-black">Cargo:</span>
                    <input 
                        className="px-4 border-l-0 cursor-default border-gray-300 focus:outline-none  rounded-md rounded-l-none shadow-sm -ml-1 w-4/6 text-black"
                        type="text" value={user.cargo}  readonly/>
                </div>
        </div>
        <div className="md:col-span-3 h-50 shadow-xl p-4 space-y-2 hidden md:block">
            <h3 className="font-bold uppercase text-black"> Descripcion del Perfil</h3>
            <p className="text-black"> 
            <h2>Responsabilidades clave de un Gerente de Telecomunicaciones:</h2>
              <ol>
                  <li><strong>Gestión y Supervisión de Sistemas de Telecomunicaciones</strong>: Se encargan de la gestión, supervisión y asesoramiento técnico sobre sistemas de telecomunicaciones.</li>
                  <li><strong>Identificación de Necesidades y Requisitos</strong>: Reciben comentarios, identifican las necesidades y los requisitos de los usuarios y movilizan la tecnología existente para cumplir con sus criterios.</li>
                  <li><strong>Mantenimiento de Registros</strong>: Mantienen registros sobre la instalación, reparación y reemplazo de equipos.</li>
                  <li><strong>Investigación de Desarrollos Tecnológicos</strong>: Investigan desarrollos en tecnología de telecomunicaciones.</li>
                  <li><strong>Consultas a Proveedores y Departamentos de Ventas</strong>: Consultan a proveedores y departamentos de ventas sobre nuevos productos y actualizaciones.</li>
              </ol>
              <p>Es importante tener en cuenta que las responsabilidades específicas pueden variar dependiendo de la organización y el alcance del rol. Además, este rol puede requerir habilidades de liderazgo, ya que a menudo implica la supervisión de un equipo de trabajo.</p>
            </p>
        </div>
            
    </div>
</div>
  )
}

export default page