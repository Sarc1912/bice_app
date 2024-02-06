"use client"
import React, { useEffect, useState } from 'react'
import {InputLabelMovil} from "@/app/agencies/[agency]/Inputs"
import Devices from './Devices';

function AddDevices(props) {
  console.log(props)
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [type, setType] = useState('');
  const [devices, setDevices] = useState('')

  const [fabricante, setFabricante] = useState("Cisco")
  const [enlace, setEnlace] = useState("Enlace")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const fetchDevices = async () => {
      const res = await fetch('/api/device/device', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
      const data = await res.json();

      if(data){
        setDevices(data.data)
      }
    };
  
    fetchDevices();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Deshabilita el botón
  
    fetch('/api/device/device', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre_dispositivo: name,
        fabricante: parseInt(1),
        tipoEnlace: parseInt(1),
        velocidad: speed,
        tipo_dispositivo:type,
        status: parseInt(1)
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if(data.error){
        console.log(data.error)
      }else{
        console.log(data)
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    })
    .finally(() => {
      setIsLoading(false); // Habilita el botón
    });
  };

  const handleName = (event) => {
    setName(event.target.value); // Actualiza el estado con el nuevo valor del input
  };

  const handleSpeed = (event) => {
    setSpeed(event.target.value)
  }

  const handleType = (event) => {
    setType(event.target.value)
  }


  return (
    <div className='text-black'>
        <p className="text-black">Dispositivos en la Agencia</p>
        <Devices data={devices} />
        <form onSubmit={handleSubmit}>
        <div class="w-72 flex">
          <InputLabelMovil onChange={handleName} title={"Dispositivo"} size={"3/4"} />
          <input type="text" value={fabricante} className='ml-2 w-14 mr-3'  />
          <input type="text" value={enlace} className='ml-2 w-12 mr-3'  />

          <InputLabelMovil onChange={handleSpeed} title={"Velocidad"} size={"3/4"} />
          <InputLabelMovil onChange={handleType} title={"Tipo"} size={"3/4"} />
          <button className="bg-gradient-to-tr from-red-600 to-red-400 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">{isLoading ? 'Cargando...' : 'Guardar'}
              </button>
        </div>
        </form>
    </div>
  )
}

export default AddDevices