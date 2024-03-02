"use client";

import { Select, SelectItem } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import AddDevices from "@/app/devices/components/AddDevices"
import { data } from "autoprefixer";
import Swal from "sweetalert2";


function Agency({params}) {
  const [id_agencia, setId_agencia] = useState("")
  const [place, setPlace] = useState("")
  const [name, setName] = useState("");
  const [cod, setCode] = useState("");
  const [ext, setExt] = useState("");
  const [state, setState] = useState("")
  const [mun, setMun] = useState("")
  const [isLoading, setIsLoading] = useState(false);
  const [selectedState, setSelectedState] = useState()
  const [selectedMun, setSelectedMun] = useState()
  const [stateName, setStateName] = useState()
  const [MunName, setMunName] = useState()


  useEffect(() => {
    const fetchAgency = async () => {
      const res = await fetch('http://localhost:3001/searchAgency', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_agencia:(parseInt(params.agency))
        })
      });

      
      const data = await res.json();
      
      if(data.error){
        Swal.fire({
          title: "No se jan cargado los datos correctamente",
          icon: 'error',
          confirmButtonText: 'Cerrar'
        })}

        console.log(data)
      
      if(data){
        setName(data.resp[0].nombre_agencia)
        setCode(data.resp[0].cod_oficina)
        setExt(data.resp[0].extensionn)
        setSelectedState(parseInt(data.resp[0].estado))
        setSelectedMun(parseInt(data.resp[0].municipio))
        setPlace(data.resp[0].direccion)
        setId_agencia(data.resp[0].direccion_agencia)
      }
    };
  
    fetchAgency();
  }, []);

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

      setState(data && data.estados)
    };

    fetchData();
    setStateName(  state && state.find(estado => estado.id_estado === selectedState).estado)

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

      setMun(data && data.municipios)
    };

    fetchData();
    const foundMunicipio = mun && mun.find(municipio => municipio.id_municipio === selectedMun);
    setMunName(foundMunicipio ? foundMunicipio.municipio : null);


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

    const userData = JSON.parse(localStorage.getItem("userData"))
	
    const token = localStorage.getItem("token")


    fetch('http://localhost:3001/updAgency', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_agencia:(parseInt(params.agency)),
                tipo_u: userData.tipoUsuario,
                cargo: userData.cargo,
                token: token,
                state:parseInt(selectedState),
                mun: parseInt(selectedMun),
                place: place,
                name: name,
                cod: cod,
                ext: parseInt(ext),
                direccion: id_agencia
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
                    title: "Su agencia ha sido registrado exitosamente.",
                    text: "Será redireccionado en breve.",
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                  })
                  setTimeout(function(){
                    window.location.href = "/agencies";
                  }, 3000);   
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
            });

  };


  return (

    <div>
      <div class="w-full">
        <h1 class="text-2xl font-semibold">Actualizar agencia</h1>
        <div class="md:flex mt-4 space-x-4  justify-center">
          <div class="bg-white gap-2 p-4 rounded-xl">
            <strong className="text-black">Ubicación de la agencia</strong>
            <form class="max-w-sm mx-auto">
      <p className="text-black">Estado</p>
      <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
      isRequired
      placeholder={stateName ? stateName : 'Selecciona un estado'}
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
      placeholder={MunName ? MunName : 'Selecciona un estado'}
      value={selectedMun}
      onChange={handleChangeMun}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-4"
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
              <button className="bg-gradient-to-tr from-red-600 to-red-400 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-3">{isLoading ? 'Cargando...' : 'Guardar'}
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
