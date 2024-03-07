"use client"

import React, { useEffect, useState } from 'react'
import ModalIp from './ModaIP'
import EditDevice from './EditDevice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faNetworkWired, faPlus } from '@fortawesome/free-solid-svg-icons'

function DinamicTable() {
	const [data, setData] = useState(null);
	const [isOpen, setIsOpen] = useState(false);
	const [oOpen, setOopen] = useState(false);
	const [disp, setDisp] = useState()

	useEffect(() => {
		async function loadDisp() {
		  const userData = JSON.parse(localStorage.getItem("userData"))
		  const token = localStorage.getItem("token")
	
		  const res = await fetch("http://localhost:3001/devices",{
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
		  setData(data);
		}
	
		loadDisp();
	  }, []);

	const onOpen = (dispo, method = "add") => {
		if (method === "upd") {
			setDisp(dispo)
			setOopen(true)
		}else{
			setDisp(dispo.id_dispositivo)
			setIsOpen(true);
		}
	  };
	
	  const onOpenChange = (isOpen) => {
		setIsOpen(isOpen);
	  };

	  const oOpenChance = (oOpen) => {
		setOopen(oOpen)
	  }

	const active = (
		<span
		class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
		<span aria-hidden
			class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
	<span class="relative">Activo</span>
	</span>
	)

	const inactive = (
		<span
		class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
		<span aria-hidden
			class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
	<span class="relative">Inactivo</span>
	</span>
	)

	let method;


  return (
    <>
	<thead>
		<tr>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Dispositivo
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Fabricante
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Tipo de Enlace
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Velocidad
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Tipo de Dispositivo
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Estatus
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Acciones
			</th>
		</tr>
	</thead>
	<tbody>
		{data && data.map(disp =>(
		<tr>
			<td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-black" >{disp.nombre_dispositivo}</td>
			<td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-black" >{disp.fabricante}</td>
			<td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-black" >{disp.tipo_enlace}</td>
			<td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-black" >{disp.velocidad}</td>
			<td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-black" >{disp.tipo_dispositivo}</td>
			<td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-black" >{disp.estaus_dispositivo === "Activo" ? active : inactive}</td>
			<td className='px-3 py-5 border-b border-gray-200 bg-white text-sm text-black '>
				<button className='bg-gradient-to-tr from-red-600 to-red-400 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer mt-2' onClick={()=>onOpen(disp,method="add")}>
						<FontAwesomeIcon icon={faNetworkWired} />
			</button>
				<button className='ml-3 bg-gradient-to-tr from-red-600 to-red-400 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer ' onClick={()=>onOpen(disp,method="upd")}>
					<FontAwesomeIcon icon={faEdit} />
				</button>
			</td>
		</tr>
		))}
	</tbody>
	<div className='flex justify-end w-full'>

	</div>


	<ModalIp isOpen={isOpen} onOpenChange={onOpenChange} dispo={disp} />
	<EditDevice isOpen={oOpen} onOpenChange={oOpenChance} dispo={disp} />
    </>
  )
}

export default DinamicTable