"use client";

import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import addDevices from "@/app/devices/components/AddDevices";

function Add() {
  const [selectedValue, setSelectedValue] = useState(null)
  const [place, setPlace] = useState("")
  const [name, setName] = useState("");
  const [cod, setCode] = useState("");
  const [ext, setExt] = useState("");
  const [state, setState] = useState("")
  const [selectedState, setSelectedState] = useState()
  const [mun, setMun] = useState("");
  const [selectedMun, setSelectedMun] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    const token = localStorage.getItem("token")

    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/states', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tipo_u: userData.tipoUsuario,
            cargo: userData.cargo,
            token: token,
        }),
      });
      const data = await response.json();

      setState(data.estados)
    };

    fetchData();
  }, []);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"))
    const token = localStorage.getItem("token")

    const fetchData = async () => {
      const response = await fetch('http://localhost:3001/municipalities', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tipo_u: userData.tipoUsuario,
            cargo: userData.cargo,
            token: token,
            state: selectedState
        }),
      });
      const data = await response.json();
      console.log(data)
      setMun(data.municipios)
    };

    fetchData();
  }, [state, selectedState]);


  const handleChangeState = (event) => {
    setSelectedState(event.target.value);
  };

  const handleChangeMun = (event) => {
    setSelectedMun(event.target.value);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Deshabilita el botón
  
    fetch('/api/agency/addAgency', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        estado: parseInt(state),
        municipio: parseInt(mun),
        ubicacion: place,
        nombre_Agencia: name,
        cod_agencia: parseInt(cod),
        extension: parseInt(ext)
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

  return (
    <div>
      <div class="w-full">
        <h1 class="text-2xl font-semibold">Agregar Agencia</h1>
        <div class="md:flex mt-4 space-x-4  justify-center">
          <div class="bg-white gap-2 p-4 rounded-xl">
            <strong className="text-black">Ubicación de la agencia</strong>
            <form class="max-w-sm mx-auto">
      <p className="text-black">Estado</p>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
      isRequired
      placeholder={selectedState ? '' : 'Selecciona un estado'}
      value={selectedState}
      onChange={handleChangeState}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      size={"sm"}
      scrollShadowProps={{
        isEnabled: true
      }}


      style={{ width:350 }}
    >
      {state && state.map((estado) => (
        <SelectItem key={estado.id_estado} value={estado.estado} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {`${estado.estado}`}
        </SelectItem>
      ))}
    </Select>
    </div>
    <p className="text-black">Municipio</p>
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
      isRequired
      placeholder={selectedMun ? '' : 'Selecciona un Municipio'}
      value={selectedMun}
      onChange={handleChangeMun}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      size={"sm"}

      style={{ width:350 }}
    >

      {mun && mun.map((municipio) => (
        <SelectItem key={municipio.id_municipio} value={municipio.municipio} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {`${municipio.municipio}`}
        </SelectItem>
      ))}
    </Select>
    </div>
              <label htmlFor="Ubicacion"  className="text-black">Ubicación</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Ubicacion"
                placeholder="Ej. Frente a Farmatodo"
              value={place} onChange={(e)=>setPlace(e.target.value)} required/>
            </form>
          </div>

          {/* Bloque de Datos Agencia */}
          
          <div class="bg-white gap-2 p-4 rounded-xl">
            <form onSubmit={handleSubmit}>
            <div>
            <strong className="text-black">Datos de la agencia</strong><br />
            <label htmlFor="NomAgencia"  className="text-black">Nombre de la agencia</label>
              <input
                type="text"
                style={{ width:350 }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="NomAgencia" placeholder="Ej. Agencia San Cristobal"
                required value={name} onChange={(e)=>setName(e.target.value)}
              />
                <div className="flex flex-wrap mt-4 space-x-2 ">
                  <div className="w-1/2 text-black ml-2">
                  Cod. Agencia

                  </div>
                  <div className="w-2/2 text-black ml-2">
                  Extensión
                  </div>

                <div className="w-1/2">
                <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="CodAgencia" placeholder="Ej. 301"
                required value={cod} onChange={(e)=>setCode(e.target.value)}/></div>

              <div className="w-2/2">

              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Ext" placeholder="Ej. 000000"
                required value={ext} onChange={(e)=>setExt(e.target.value)}/>
              </div>
              <button className="bg-gradient-to-tr from-red-600 to-red-400 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-3">{isLoading ? 'Cargando...' : 'Guardar'}</button>
                </div>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
