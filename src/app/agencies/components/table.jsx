import {Edit, Disable} from '@/app/components/Buttons'
import React from 'react'

function DinamicTable() {
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

	const value = 1;
  return (
    <>
	<thead>
		<tr>
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
		<tr>
			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
						<div class="ml-3">
							<p class="text-gray-900 whitespace-no-wrap">
								TPLink a5553
							</p>
						</div>
					</div>
			</td>
			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<p class="text-gray-900 whitespace-no-wrap">Agencia 553</p>
			</td>
			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				<p class="text-gray-900 whitespace-no-wrap">
					10.0.0.0
				</p>
			</td>
			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
				{active}
			</td>
			<td class="px-5 py-5 border-b border-gray-200 bg-white text-sm flex space-x-3">
				<p class="text-gray-900 whitespace-no-wrap">
					<Edit link={`agencies/${value}`} />
				</p>
				<p className='text-black'>
					<Disable id={value} />
				</p>
			</td>
		</tr>
	</tbody>
    </>
  )
}

export default DinamicTable