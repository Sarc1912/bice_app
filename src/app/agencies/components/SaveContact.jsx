"use client"

import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const SaveContact = ({id, action, con} ) => {
    const [names, setNames] = useState(con ? con.nombres:"")
    const [lastnames, setLastNames] = useState(con ? con.apellidos:"")
    const [mail, setMail] = useState("")
    const [ci, setCi] = useState(con ? con.cedula:"")
    const [cel1, setCel1] = useState(con ? con.telefono1:"")
    const [cel2, setCel2] = useState(con ? con.telefono2:"")
    const [ext, setExt] = useState(con ? con.extensiondca:"")
    const [isLoading, setIsLoading] = useState(false)
    
    const handleChange = (event, setter) => {
        const value = event.target.value;
        if (/^\d*$/.test(value)) {
          setter(value);
        }
    };

    const met = action === "add" ? 'http://localhost:3001/saveContact/' : 'http://localhost:3001/updContact/'

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true)
        fetch(met, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                names:names,
                lastNames: lastnames,
                ci:ci,
                cel1:cel1,
                cel2:cel2,
                ext:ext,
                id_a:id,
                id_contacto: con ? con.id_contacto : ""
              }),
            })
            .then((response) => response.json())
            .then((data) => {
              if(data.error){
                Swal.fire({
                  title: data.error,
                  icon: 'error',
                  confirmButtonText: 'Cerrar'
                })
              }else{
                Swal.fire({
                    title: data.msg,
                    text: "Será redireccionado en breve.",
                    icon: 'success',
                    showConfirmButton: false,
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
                window.location.href = "/agencies/"
              },2000)
            });
    }

    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-2",
        cancelButton: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2"
      },
      buttonsStyling: false
    });

    const handleDelete = (e, id) => {
      console.log(id)

      e.preventDefault();
      swalWithBootstrapButtons.fire({
        title: "Estas seguro?",
        text: "Luego no podras revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, borrar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true
      }).then((result) => {

        if (result.isConfirmed) {
          console.log("true")
          fetch('http://localhost:3001/delContact/',{
            method:"POST",
            headers: {
              'Content-Type': 'application/json',
            },
        body: JSON.stringify({
          id_contacto: id
        })
        })      
        .then((response) => response.json())
        .then((data) => {
          if(data.error){
            console.log("error")
            Swal.fire({
              title: data.error,
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
          }else{
            swalWithBootstrapButtons.fire({
              title: "Borrar",
              text: data.msg,
              icon: "success",
              showConfirmButton: false,

            });
          }
        })
        .finally(() => {
          setIsLoading(false); // Habilita el botón
          setTimeout(()=>{
            window.location.href = "/agencies/"
          },2000)
        });
        
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire({
            title: "Cancelado",
            text: "Has decidido no borrar el contacto",
            icon: "error"
          });
        }
      });
    }

    const but = action === "add" ? "Guardar" : "Actualizar"
    
    return (
    <form class="flex" onSubmit={handleSubmit}>
      <input onChange={(e) => setNames(e.target.value)} value={names} maxLength="50" class="rounded border focus:border-red-700 focus:shadow-md m-1" type="text" placeholder="Nombres" required style={{ width:"200px" }} />
      <input onChange={(e) => setLastNames(e.target.value)} value={lastnames} maxLength="25" class="rounded border focus:border-red-700 focus:shadow-md m-1" type="text" placeholder="Apellidos" required style={{ width:"200px" }} />
      <input onChange={(e) => setMail(e.target.value)} value={mail} maxLength="25" class="rounded border focus:border-red-700 focus:shadow-md m-1" type="email" placeholder="Correo" required style={{ width:"200px" }} />
      <input onChange={(e)=>handleChange(e, setCi)} value={ci} maxLength="8" class="rounded border focus:border-red-700 focus:shadow-md m-2 p-2" type="text" placeholder="Cedula" required style={{ width:"100px" }} />
      <input onChange={(e)=>handleChange(e, setCel1)} value={cel1} maxLength="11" class="rounded border focus:border-red-700 focus:shadow-md m-2 p-2 " type="text" placeholder="Celular 1" required style={{ width:"130px" }} />
      <input onChange={(e)=>handleChange(e, setCel2)} value={cel2} maxLength="11" class="rounded border focus:border-red-700 focus:shadow-md m-2 p-2 " type="text" placeholder="Celular 2" style={{ width:"130px" }} />
      <input onChange={(e)=>handleChange(e, setExt)} value={ext} maxLength="6" class="rounded border focus:border-red-700 focus:shadow-md m-2 p-2 " type="text" placeholder="Extension de oficina"  required style={{ width:"90px" }}/>
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isLoading} type="submit">
        {isLoading ? "Cargando..." : but }
      </button>

      {(action === "upd") ? (
      <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-2" disabled={isLoading} type="submit" onClick={(e)=> handleDelete(e, con.id_contacto)}>
          <FontAwesomeIcon icon = {faTrash} />
        </button>
      ) : null}
    </form>
    )    
}

export default SaveContact