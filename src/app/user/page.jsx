'use client'

import React from 'react'
import Swal from 'sweetalert2'
import Table from '../components/Table'

async function loadUsers() {
const userData = JSON.parse(localStorage.getItem("userData"))

const token = localStorage.getItem("token")

  const res = await fetch("http://localhost:3001/users",{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      tipo_u: userData.tipoUsuario,
      cargo: userData.cargo,
      token: token,
    }),
  })

  const data = await res.json();

  return data
}

async function Users() {

  const data = await loadUsers()

  if(data.error){
    Swal.fire({
      title: data.error,
      icon: 'warning',
      confirmButtonText: 'Cerrar'
      })

      return (
        <div>
          Su usuario no tiene suficientes privilegios para realizar esta acción.
        </div>
      )
  }

  const title = [
    {title:"Nombre y Apellido"},
    {title:"Correo"},
    {title:"Cargo"},
    {title:"Área"},
    {title:"Estatus del usuario"}
  ]
  return (
    <div className="bg-white p-8 rounded-md w-full">
    <div className=" flex items-center justify-between pb-6">
      <div>
        <h2 className="text-gray-600 font-semibold">Usuarios del Sistema</h2>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex bg-gray-50 items-center p-2 rounded-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20"
            fill="currentColor">
            <path fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd" />
          </svg>
          <input className="bg-gray-50 outline-none ml-1 block " type="text" name="" id="" placeholder="search..." />
            </div>
        </div>
      </div>
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
                <Table title = {title} data = {data}  />
            </table>
            {/* <div
              className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
              <span className="text-xs xs:text-sm text-gray-900">
                              Showing 1 to 4 of 50 Entries
                          </span>
              <div className="inline-flex mt-2 xs:mt-0">
                <button
                                  className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-gradient-to-tr from-red-600 to-red-400 font-semibold py-2 px-4 rounded-l">
                                  Prev
                              </button>
                &nbsp; &nbsp;
                <button
                                  className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-gradient-to-tr from-red-600 to-red-400 font-semibold py-2 px-4 rounded-r">
                                  Next
                              </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Users