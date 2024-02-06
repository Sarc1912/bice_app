import React from 'react'

function Devices(data) {
    const active = (
		<span
		class="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
		<span aria-hidden
			class="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
	<span class="relative">Activo</span>
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
	<span class="relative">Inactive</span>
	</span>
	)
    console.log(data)
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
				Tipo Enlace
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Velocidad
			</th>
            <th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Tipo Dispositivo
			</th>
			<th
				class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
				Status
			</th>
		</tr>
	</thead>
	<tbody>
    {data && Array.isArray(data.data) && data.data.map(device => (
		<tr key={device.id_dispositivo}>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
                <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                        {device.nombre_dispositivo}
                    </p>
                </div>
            </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
                <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                        {device.fabricante === 1 ? "Fabricante" : "Fabricante"}
                    </p>
                </div>
            </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
                <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                        {device.tipo_enlace === 1 ? "Enlace" : "Enlace"}
                    </p>
                </div>
            </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
                <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                        {device.velocidad}
                    </p>
                </div>
            </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
                <div class="ml-3">
                    <p class="text-gray-900 whitespace-no-wrap">
                        {device.tipo_dispositivo}
                    </p>
                </div>
            </div>
        </td>
        <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm flex space-x-3">
            <p class="text-gray-900 whitespace-no-wrap">
                {device.estatus === 1 ?active:inactive}
            </p>
        </td>
    </tr>
    ))}
	</tbody>
    </>
  )
}

export default Devices