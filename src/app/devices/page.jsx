'use client'

import React, { useState } from 'react'
import DinamicTable from './components/DinamicTable'
import ModalDevice from './components/ModalDevices'

function Devices() {
	const [isOpen, setIsOpen] = useState(false);

	const onOpen = () => {
		setIsOpen(true);
	  };
	
	  const onOpenChange = (isOpen) => {
		setIsOpen(isOpen);
	  };

  return (
	<div className="bg-white p-8 rounded-md w-full">
	<div className=" flex items-center justify-between pb-6">
		<div>
			<h2 className="text-gray-600 font-semibold">Dispositivos en la red</h2>
		</div>
		<div className="flex items-center justify-between">
				<div className="lg:ml-40 ml-10 space-x-8">
					<button onClick={() => onOpen()} className="bg-gradient-to-tr from-red-600 to-red-400 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">Registrar Dispositivo</button>
				</div>
			</div>
		</div>
		<div>
			<div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
				<div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
							<DinamicTable />
							<ModalDevice isOpen={isOpen} onOpenChange={onOpenChange} />

					</table>
				</div>
			</div>
		</div>
	</div>
  )
}

export default Devices