"use client"

import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';

Chart.register(ArcElement);

function PieNew() {
    const [data, setData] = useState([]);

    useEffect(()=>{
		const intervalId = setInterval(async ()=>{
			try {
				const res = await fetch("http://localhost:3001/searchIP",{
				method:'POST',
				headers: {
				'Content-Type': 'application/json',
				},
			})
				const data = await res.json();
				setData(data.msg)
			} catch (error) {
				console.log(error)
			}
		}, 5000)
		return () => clearInterval(intervalId);

	}, [])

    let estatus1Count = 0, estatus2Count = 0;

data && data.forEach(item => {
    if(item.estatus === 1) estatus1Count++;
    if(item.estatus === 2) estatus2Count++;
});

// Datos para el gráfico
const pieData = {
    labels: ['Activas', 'Inactivas'],
    datasets: [
        {
            data: [estatus1Count, estatus2Count],
            backgroundColor: ['#158143', '#EF4444'],
            hoverBackgroundColor: ['#166536', '#B71E1E']
        }
    ]
};


    return (
        <div className='bg-white rounded-lg shadow-lg shadow-red-600 text black px-10'>
            <Pie 
                data={pieData} 
                options={{
                    plugins: {
                        legend: {
                            display: true
                        }
                    }
                }}
            />

<table className="min-w-full divide-y divide-gray-200 text-black mt-2">
        <thead className="bg-gray-50">
            <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Estatus
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                </th>
            </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
            <tr>
                <td className="px-6 py-4 whitespace-nowrap">
                <span className='bg-green-800 bg-opacity-30 px-3 rounded-lg text-black'>
                    Activo
                </span>

                    
                </td>
                <td className="px-6 py-4 whitespace-nowrap ">
                    {estatus1Count}
                </td>
            </tr>
            <tr className='mt-4'>
            <span className='bg-red-500 bg-opacity-30 px-3 rounded-lg text-black ml-4'>
                    Inactivo
                </span>
                <td className="px-6 py-4 whitespace-nowrap">
                    {estatus2Count}
                </td>
            </tr>
        </tbody>
    </table>
        </div>
    );
}

export default PieNew;
