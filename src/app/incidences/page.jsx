import React from 'react'
import ChangeIncidence from './components/ChangeIncidence';

async function searchAllIncidences(){

  try {
    const res = await fetch("http://localhost:3001/searchAllIncidences/",{
    method:'POST',
    headers: {
    'Content-Type': 'application/json',
    },
  })
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log(error)
  }
}

async function app() {

  const data = await searchAllIncidences()

  console.log(data)

  return (


    <div>
      <table className='text-black'>
        <thead>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Incidencia</th>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Fecha</th>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>IP</th>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Estatus</th>
          <th className='px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider'>Cerrar Incidencia</th>
        </thead>
        <tbody>
        {data ? data.map((incidence)=>(
        <tr key={incidence.id_incidencia}>
          <td className='px-3 py-5 border-b border-gray-200 bg-white text-sm'>
            {incidence.descr_incidencia}
          </td>
          <td className='px-3 py-5 border-b border-gray-200 bg-white text-sm'>{incidence.fecha}</td>
          <td className='px-3 py-5 border-b border-gray-200 bg-white text-sm'>{incidence.ip}</td>
          <td className='px-3 py-5 border-b border-gray-200 bg-white text-sm'>{incidence.estatus === 1 ? "Abierta" : "Cerrada"}</td>
          <td className='px-3 py-5 border-b border-gray-200 bg-white text-sm'>
            <ChangeIncidence props = {incidence.id_incidencia} />
          </td>
        </tr>
      )) : "Cargando..."}
        </tbody>
      </table>
    </div>
  )
}

export default app