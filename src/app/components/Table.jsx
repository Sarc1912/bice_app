"use client"

import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { active, inactive } from '../user/components/Buttons/Buttons'
import ModalUser from '../user/components/Modals/ModalUser';

function Table({title, data}) {
	const [selectedItem, setSelectedItem] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

    const Tabletitle = title
    const userData = data.users

	const onOpen = (item) => {
		setSelectedItem(item);
		setIsOpen(true);
	  };
	
	  const onOpenChange = (isOpen) => {
		setIsOpen(isOpen);
		if (!isOpen) {
		  setSelectedItem(null);
		}
	  };

  return (
    <>
	<thead>
		<tr>
        {Tabletitle.map(item =>(
        <th class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider" key={item.title}>
            {item.title}
            </th>
        ))}
		</tr>
	</thead>
	<tbody>
            {userData.map(item =>(
        <tr>
            <td class="px-3 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
						<div class="ml-3">
							<p class="text-gray-900 whitespace-no-wrap">
								{item.usuario}
							</p>
						</div>
					</div>
			</td>
            <td class="px-3 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
						<div class="ml-3">
							<p class="text-gray-900 whitespace-no-wrap">
								{item.correo}
							</p>
						</div>
					</div>
			</td>
            <td class="px-3 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
						<div class="ml-3">
							<p class="text-gray-900 whitespace-no-wrap">
								{item.cargo}
							</p>
						</div>
					</div>
			</td>
            <td class="px-3 py-5 border-b border-gray-200 bg-white text-sm">
				<div class="flex items-center">
						<div class="ml-3">
							<p class="text-gray-900 whitespace-no-wrap">
								{item.area}
							</p>
						</div>
					</div>
			</td>
            <td class="px-3 py-3 border-b border-gray-200 bg-white text-sm">
            { item.estatus === "Activo" ? active : inactive }
			</td>
			<td class="px-3 py-5 border-b border-gray-200 bg-white text-sm">
            <div class="flex items-center">
              <button onClick={() => onOpen(item)} className="block w-full bg-red-600 py-1 px-1 rounded-2xl hover:bg-red-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2">
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <ModalUser isOpen={isOpen} onOpenChange={onOpenChange} user={selectedItem} />
            </div>
          </td>
            </tr>
            
            ))}
	</tbody>


    </>
  )
}

export default Table