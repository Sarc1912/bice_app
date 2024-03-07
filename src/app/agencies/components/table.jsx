"use client"

import {Edit, Disable, DataContact} from '@/app/components/Buttons'
import React, { useState } from 'react'
import ModalContactAgency from './ModalContactAgency'

async function loadAgencies() {
	const userData = JSON.parse(localStorage.getItem("userData"))
	
	const token = localStorage.getItem("token")
	
	  const res = await fetch("http://localhost:3001/agencies",{
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


	
	  return data.agencias
	}

async function DinamicTable() {
	const [isOpen, setIsOpen] = useState(false);
	const [selectA, setSelectA] = useState("")

	const onOpen = (a) => {
		setSelectA(a)
		setIsOpen(true);
	  };
	
	  const onOpenChange = (isOpen) => {
		setIsOpen(isOpen);
	  };


	const agencies = await loadAgencies();

	const active = (
		<span
		class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
		<span aria-hidden
			class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
	<span class="relative">Activa</span>
	</span>
	)

	const suspended = (
		<span
		class="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
		<span aria-hidden
			class="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
	<span class="relative">Suspended</span>
	</span>
	)

	const inactive = (
		<span
		class="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
		<span aria-hidden
			class="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
	<span class="relative">Inactiva</span>
	</span>
	)

	return (
    <>
	<thead>
		<tr>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Nombre Agencia
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Ubicacion
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Cod. Agencia
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Extension
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Status
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Acciones
			</th>
		</tr>
	</thead>
	<tbody>

	{/* {
      id_agencia: 3,
      nombre_agencia: 'asdasdas',
      cod_oficina: 300,
      descr_estatus_agencia: 'Activa',
      direccion: 'adadas',
      extensionn: 123
    }, */}
		{agencies && agencies.map((agency) => (
		<tr key={agency.id_agencia}>
			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
					<div class="ml-3">
						<p class="text-gray-900 whitespace-no-wrap">
						{agency.nombre_agencia}
						</p>
					</div>
				</div>
			</td>
			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
					<div class="ml-3">
						<p class="text-gray-900 whitespace-no-wrap">
						{agency.direccion}						</p>
					</div>
				</div>
			</td>

			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
					<div class="ml-3">
						<p class="text-gray-900 whitespace-no-wrap">
						{agency.cod_oficina}</p>
					</div>
				</div>
			</td>

			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
					<div class="ml-3">
						<p class="text-gray-900 whitespace-no-wrap">
						{agency.extensionn === null ? "N/A" : agency.extensionn}
						</p>
					</div>
				</div>
			</td>
			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
					<div class="ml-3">
						<p class="text-gray-900 whitespace-no-wrap">
						{agency.descr_estatus_agencia === "Activa" ? active : inactive}
						</p>
					</div>
				</div>
			</td>
			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm flex space-x-3">
				<p class="text-gray-900 whitespace-no-wrap">
					<Edit link={`agencies/${agency.id_agencia}`} />
				</p>
				<p class="text-gray-900 whitespace-no-wrap">
					<DataContact onOpen={() => onOpen(agency)} />
				</p>
				<p className='text-black'>
					<Disable id={agency.id_agencia} url={"http://localhost:3001/changeStatusAgency"} estatus={agency.descr_estatus_agencia} />
				</p>
			</td>
		</tr>
			))}

	</tbody>

	<ModalContactAgency isOpen={isOpen} onOpenChange={onOpenChange} agency={selectA} />
    </>
  )
}

export default DinamicTable