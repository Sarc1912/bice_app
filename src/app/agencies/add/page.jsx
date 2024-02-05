"use client";

import { Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";

function Add() {
  const estados = [
    { value: 1, label: "Caracas" },
    { value: 2, label: "Valencia" },
    { value: 3, label: "Lara" },
  ];

  const municipios = [
    { value: 1, label: "Sucre" },
    { value: 2, label: "Petare" },
    { value: 3, label: "Algo" },
  ];

  const [selectedValue, setSelectedValue] = useState(null)

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
      placeholder={selectedValue ? '' : 'Selecciona un estado'}
      value={selectedValue}
      onChange={setSelectedValue}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      size={"sm"}

      style={{ width:350 }}
    >
      {estados.map((estado) => (
        <SelectItem key={estado.value} value={estado.value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {`${estado.label}`}
        </SelectItem>
      ))}
    </Select>
    </div>
    <p className="text-black">Municipio</p>
    <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
      <Select
      isRequired
      placeholder={selectedValue ? '' : 'Selecciona un Municipio'}
      value={selectedValue}
      onChange={setSelectedValue}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      size={"sm"}

      style={{ width:350 }}
    >
      {municipios.map((municipio) => (
        <SelectItem key={municipio.value} value={municipio.value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          {`${municipio.label}`}
        </SelectItem>
      ))}
    </Select>
    </div>
              <label htmlFor="Ubicacion"  className="text-black">Ubicacion</label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Ubicacion"
              />
            </form>
          </div>

          {/* Bloque de Datos Agencia */}
          
          <div class="bg-white gap-2 p-4 rounded-xl">
            <div>
            <strong className="text-black">Datos de la agencia</strong><br />
            <label htmlFor="NomAgencia"  className="text-black">Nombre de la gencia</label>
              <input
                type="text"
                style={{ width:350 }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="NomAgencia" placeholder="Ej. Agencia San Cristobal"
              />
                <div className="flex flex-wrap mt-4 space-x-2 ">
                  <div className="w-1/2 text-black ml-2">
                  Cod. Agencia

                  </div>
                  <div className="w-2/2 text-black ml-2">
                  Extension

                  </div>

                <div className="w-1/2">
                <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="CodAgencia" placeholder="Ej. 301"
              /></div>

              <div className="w-2/2">

              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" id="Ext" placeholder="Ej. 000000"
              />
              </div>
              <button className="bg-gradient-to-tr from-red-600 to-red-400 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-3">Guardar</button>
                </div>
            </div>
          </div>
        </div>
        <div className="bg-white gap-1 p-4 rounded-xl mt-5">
          <p className="text-black">Dispositivos en la Agencia</p>
          
        </div>
      </div>
    </div>
  );
}

export default Add;
