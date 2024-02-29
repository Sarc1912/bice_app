"use client";

import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import AddDevices from "@/app/devices/components/AddDevices"


function Agency({params}) {
  const [id_agencia, setId_agencia] = useState("")
  const [place, setPlace] = useState("")
  const [name, setName] = useState("");
  const [cod, setCode] = useState("");
  const [ext, setExt] = useState("");
  const [state, setState] = useState("")
  const [mun, setMun] = useState("")
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAgency = async () => {
      const res = await fetch('/api/agency/searchAgency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
      });
      const data = await res.json();
      if(data){
        setName(data[0].nombre_agencia)
        setState(data[0].direccion)
        setCode(data[0].cod_oficina)
        setExt(data[0].extensionn)
        setState('1')
        setMun('1')
        setPlace(data[0].direccion)
        setId_agencia(data[0].id_agencia)
      }
    };
  
    fetchAgency();
  }, []);


  const estados = [
    { value: 1, label: "Miranda" },
  ];

  const municipios = [
    { value: 1, label: "Chacao" },
  ];

  const handleChangeState = (event) => {
    setState(event.target.value);
  };

  const handleChangeMun = (event) => {
    setMun(event.target.value);
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
      placeholder={state ? '' : 'Selecciona un estado'}
      value={state}
      onChange={handleChangeState}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      size={"sm"}

      style={{ width:350 }}
    >
      {estados.map((estado) => (
        <SelectItem key={estado.value} value={estado.value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {`___${estado.label}`}
        </SelectItem>
      ))}
    </Select>
    </div>
    <p className="text-black">Municipio</p>
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
      isRequired
      placeholder={mun ? '' : 'Selecciona un Municipio'}
      value={mun}
      onChange={handleChangeMun}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      size={"sm"}

      style={{ width:350 }}
    >
      {municipios.map((municipio) => (
        <SelectItem key={municipio.value} value={municipio.value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {`___${municipio.label}`}
        </SelectItem>
      ))}
    </Select>
    </div>
              <label htmlFor="Ubicacion"  className="text-black">Ubicación</label>
              <input disabled
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
              <input disabled
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
                <input disabled
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="CodAgencia" placeholder="Ej. 301"
                required value={cod} onChange={(e)=>setCode(e.target.value)}/></div>

              <div className="w-2/2">

              <input disabled
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Ext" placeholder="Ej. 000000"
                required value={ext} onChange={(e)=>setExt(e.target.value)}/>
              </div>
              <button disabled className="bg-gradient-to-tr from-red-600 to-red-400 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-3">{isLoading ? 'Cargando...' : 'Guardar'}
              </button>
                </div>
            </div>
            </form>
          </div>
        </div>
        {/* <div className="bg-white gap-1 p-4 rounded-xl mt-5">
          <AddDevices agency={id_agencia} />
        </div> */}
      </div>
    </div>
  );
}

export default Agency;
