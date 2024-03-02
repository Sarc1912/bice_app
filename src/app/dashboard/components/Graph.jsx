import { NextResponse } from 'next/server'

async function loadDisp() {	
	  const res = await fetch("http://localhost:3001/searchIP",{
		method:'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
	  })
	
	  const data = await res.json();
	
	  return data.msg
	}

async function Graph() {

const data = await loadDisp();

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
	<span class="relative">Inactive</span>
	</span>
	)


  return (
    <>
	<thead>
		<tr>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Direccion IP
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Estatus
			</th>
		</tr>
	</thead>
	<tbody>
		{data && data.map(disp =>(
		<tr>
			<td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-black" >{disp.datos_ip}</td>
			<td className="px-3 py-5 border-b border-gray-200 bg-white text-sm text-black" >{disp.estatus === 1 ? active : inactive}</td>
		</tr>
		))}
	</tbody>
    </>
  )
}

export default Graph