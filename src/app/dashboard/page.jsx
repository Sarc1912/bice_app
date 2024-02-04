import React from 'react'
import Links from './components/Links'
import Graph from './components/Graph'

function Dashboard() {

  const links = [
    {
      icon: "svg",
      color: "#00618B",
      link:"Movistar",
      down:7,
    },
    {
      icon: "svg",
      color:"#73219D",
      link:"Digitel",
      down:12,
    },
    {
      icon: "svg",
      color:"#FF6300",
      link:"Cantv",
      down:16,
    },
  ]


  return (
<>
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
      <Links links={links} />
      </div>
      
      <Graph />

      </div>

  
</>
  )
}

export default Dashboard