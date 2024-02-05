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
        <div className="md:col-span-3 h-48 shadow-xl p-4 space-y-2 hidden md:block">
            <h3 className="font-bold uppercase text-black"> Descripcion del Perfil</h3>
            <p className="text-black"> 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget laoreet diam, id luctus lectus. Ut consectetur nisl ipsum, et faucibus sem finibus vitae. Maecenas aliquam dolor at dignissim commodo. Etiam a aliquam tellus, et suscipit dolor. Proin auctor nisi velit, quis aliquet sapien viverra a. 
            </p>
        </div>
            
    </div>
</div>
  )
}

export default page