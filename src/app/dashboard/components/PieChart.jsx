"use client"

import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

function PieNew() {
    const [data, setData] = useState({});
    const [counts, setCounts] = useState([0, 0, 0]); // Nuevo estado para los conteos


    useEffect(() => {
        const loadDisp = async () => {
            try {
                const res = await fetch("http://localhost:3001/searchIP", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const data = await res.json();
    
                // Calcular los conteos
                let newCounts = data.reduce((prev, curr) => {
                    if (curr.estatus === 1) prev[0]++;
                    else if (curr.estatus === 2) prev[1]++;
                    else if (curr.estatus === 3) prev[2]++;
                    return prev;
                }, [0, 0, 0]);
    
                setData(data);
                setCounts(newCounts); // Guardar los conteos en el estado
    
            } catch (error) {
                console.log(error);
            }
        };
    
        loadDisp();
    }, []);

    console.log(data)

    return (
        <div>
            Grafico
            {/* <PieChart */}
  {/* colors={['red', 'blue', 'green']}
  series={[
    {
      data: [
        { value: counts[0], color: 'red' },
        { value: counts[1], color: 'blue' },
        { value: counts[2], color: 'green' },
      ],
    },
  ]}
/> */}
        </div>
    );
}

export default PieNew;
