"use client"

import React, { useState } from 'react'
import Swal from 'sweetalert2';

function ChangeIncidence({props}) {
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (props, estatus) => {
        setIsLoading(true); // Deshabilita el botón
      
        fetch('http://localhost:3001/changeStatusIncidence', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id_incidencia: parseInt(props),
            estatus: parseInt(estatus)
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if(data.error){
            Swal.fire({
              title: data.error,
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
          }else{
            Swal.fire({
              title: 'Su Incidencia ha sido cerrada correctamente.',
              text: 'Será redireccionado en breve',
              icon: 'success',
              confirmButtonText: 'Cerrar'
            })

          }
        })
        .catch((error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Ha ocurrido un error, por favor intente mas tarde',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
        })
        .finally(() => {
          setIsLoading(false); // Habilita el botón
          setTimeout(()=>{
            window.location.href = "/incidences/"
          },2000)
        });
      };



  return (
<div class="flex justify-between space-x-4">
    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>handleSubmit(props, 2)}>
        Cerrar
    </button>

    <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded" onClick={()=>handleSubmit(props, 3)}>
        En espera
    </button>
</div>
  )
}

export default ChangeIncidence