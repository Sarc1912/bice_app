"use client"
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'
import SaveContact from './SaveContact'


function ModalContactAgency({ isOpen, onOpenChange, agency }) {
  const [data, setData] = useState()

  useEffect(() => {
    async function consultContact(id) {
      const res = await fetch("http://localhost:3001/contacts", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_agencia: id,
        }),
      });

      const data = await res.json();
      return data.data;
    }

    if (agency.id_agencia !== null) {
      consultContact(agency.id_agencia).then(data => {
        setData(data);
      });
    }
  }, [agency.id_agencia]); // Se ejecuta cada vez que 'id' cambia


  return (
    <Modal className='bg-black text-black rounded-t-md'
     isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true} size={"md"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 bg-red-700 text-black rounded-md">{`Contactos de Agencia: ${agency.nombre_agencia}`}</ModalHeader>
              <ModalBody className='bg-white'>

                {data.map((contact)=>(
                    <SaveContact id={agency.id_agencia} con={contact} action={"upd"} func={onClose} />
                ))}
                <SaveContact id={agency.id_agencia} con={""} action={"add"} func={onClose}  />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
  )
}

export default ModalContactAgency