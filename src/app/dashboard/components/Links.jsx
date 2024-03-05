import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Links(enlaces) {

    
  return (
    enlaces.links.map((link, key)=>
    <>
    <div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 shadow-md">
    <div className={`bg-clip-border mx-4 rounded-xl overflow-hidden bg-gradient-to-tr from-${link.color}-600 to-${link.color}-400 text-white shadow-${link.color}-500/40 shadow-lg absolute -mt-4 grid h-16 w-16 place-items-center`} style={{ background:link.color }}>
        <FontAwesomeIcon icon={link.icon} size='xl' ></FontAwesomeIcon>
      </div>
      <div className="p-4 text-right">
        <p className="block antialiased font-sans text-sm leading-normal font-normal text-blue-gray-600 text-lg">{link.link}</p>
        <h4 className="block antialiased tracking-normal font-sans text-2xl font-semibold leading-snug text-red-600">{link.down}</h4>
      </div>
    </div>
</>)
  )
}

export default Links