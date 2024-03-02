'use client'

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";

import {Select, SelectItem} from "@nextui-org/react";
import Swal from "sweetalert2";


function ModalIp({ isOpen, onOpenChange, dispo }) {
    const [name, setName] = useState();
    const [mail, setMail] = useState();
    const [isLoading, setIsLoading] = useState(false)

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Deshabilita el botón

        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")
      
        fetch('http://localhost:3001/saveIP', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            dir_ip: name,
            cod_disp: dispo,
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          if(data.error){
            Swal.fire({
              title: data.error,
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
          }else{
            Swal.fire({
              title: 'Su dispositivo ha sido registrado satisfactoriamente.',
              text: 'Será redireccionado en breve',
              icon: 'success',
              confirmButtonText: 'Cerrar'
            })

          }
        })
        .catch((error) => {
          Swal.fire({
            title: 'Error!',
            text: 'Ha ocurrido un error, por favor intente mas tarde',
            icon: 'error',
            confirmButtonText: 'Cerrar'
          })
        })
        .finally(() => {
          setIsLoading(false); // Habilita el botón
        });
      };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={true}
      isKeyboardDismissDisabled={true}
      className="bg-black"
      size="full"
    >
      <ModalContent className="rounded-lg">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-red-900 rounded-lg">
              Registrar Dispositivo
            </ModalHeader>
            <ModalBody>
              <form
                className="bg-white px-2 py-2 rounded-lg"
                onSubmit={handleSubmit}
              >
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        for="fName"
                        className="mb-3 block text-black font-medium text-[#07074D]"
                      >
                        Direccion ip
                      </label>
                      <input
                        type="text"
                        name="fName"
                        id="fName"
                        placeholder="Identificador del Dispositivo"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6  B7280] outline-none focus:border-red-700 focus:shadow-md"
                        maxLength={15}
                        value={name}
                        required
                        onChange={(e)=>setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <button className="hover:shadow-form rounded-md bg-red-700 py-3 px-8 text-center text-black font-semibold text-white outline-none">
                    Submit
                  </button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalIp;
