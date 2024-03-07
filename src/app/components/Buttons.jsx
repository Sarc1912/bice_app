"use client"
import { faCarOn, faContactCard, faDirections, faPowerOff } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

export function Edit(props) {
    let link = props.link
  return (
    <Link href={link}>
    <button className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        </button>
    </Link>
  )
}

export function Disable({id, estatus, url}) {

    const disableObject = async (id, estatus, url)=>{
      console.log(estatus)
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_agencia:(parseInt(id)),
          status: estatus
        })
      }).then((response) => response.json())
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
            title: data.msg,
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
        // setIsLoading(false); // Habilita el botón
        setTimeout(()=>{
          window.location.href = "/agencies/"
        },2000)
      });
    };


  return (
    <button className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white h-11 w-11"  onClick={()=>disableObject(id, estatus, url)}>
        <FontAwesomeIcon icon={faPowerOff} size='xl' />
    </button>
  )
}

export function DataContact({onOpen}){

  return(
    <button className="flex p-2.5 bg-red-500 rounded-xl hover:rounded-3xl hover:bg-red-600 transition-all duration-300 text-white h-11 w-11"  onClick={()=>onOpen()}>
    <FontAwesomeIcon icon={faContactCard} size='xl' />
</button>
  )
  
}

