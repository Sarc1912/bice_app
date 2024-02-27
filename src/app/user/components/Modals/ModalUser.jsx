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





function ModalUser({ isOpen, onOpenChange, user }) {
    const [cargo, setCargo] = useState([]);
    const [typeU, setTypeU] = useState([]);
    const [selectedCargo, setSelectedCargo] = useState('');
    const [selectedTypeU, setSelectedTypeU] = useState('');
    const [name, setName] = useState();
    const [mail, setMail] = useState();

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")

        const fetchData = async () => {
          const response = await fetch('http://localhost:3001/cargos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo_u: userData.tipoUsuario,
                cargo: userData.cargo,
                token: token,
            }),
          });
          const data = await response.json();
          setCargo(data.cargos);
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")

        const fetchData = async () => {
          const response = await fetch('http://localhost:3001/type_u', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tipo_u: userData.tipoUsuario,
                cargo: userData.cargo,
                token: token,
            }),
          });
          const data = await response.json();
          setTypeU(data.type_u);
        };
    
        fetchData();
      }, []);

      useEffect(()=>{
        setName(user && user.usuario)
        setMail(user && user.correo)
    },[])
    console.log(user)

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={false}
      isKeyboardDismissDisabled={true}
      className="bg-black"
      size="full"
    >
      <ModalContent className="rounded-lg">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 bg-red-900 rounded-lg">
              Editar Usuario
            </ModalHeader>
            <ModalBody>
              <form
                action="https://formbold.com/s/FORM_ID"
                method="POST"
                className="bg-white px-2 py-2 rounded-lg"
              >
                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        for="fName"
                        className="mb-3 block text-black font-medium text-[#07074D]"
                      >
                        Nombre y Apellido
                      </label>
                      <input
                        type="text"
                        name="fName"
                        id="fName"
                        placeholder="Nombre y Apellido"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6  B7280] outline-none focus:border-red-700 focus:shadow-md"
                        value={name}
                        required
                        onChange={(e)=>setName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        for="lName"
                        className="mb-3 block text-black font-medium text-[#07074D]"
                      >
                        Correo Institucional
                      </label>
                      <input
                        type="email"
                        name="lName"
                        id="lName"
                        placeholder="Correo Institucional"
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        value={mail}
                        required
                        onChange={(e)=>setMail(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        for="fName"
                        className="mb-3 block text-black font-medium text-[#07074D]"
                      >
                        Tipo de Usuario
                      </label>

                      <Select
                        items={typeU}
                        placeholder={selectedTypeU || user.tipo_usuario}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => setSelectedTypeU(e.target.value)}
                        >
                        {(typeU) => <SelectItem className="text-black bg-white" key={typeU.id_tipo_usuario}>
                                <span>{typeU.descr_tipo_usuario}</span>
                            </SelectItem>}
                        </Select>

                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        for="lName"
                        className="mb-3 block text-black font-medium text-[#07074D]"
                      >
                        Cargo
                      </label>
                      <Select
                        items={cargo}
                        placeholder={selectedCargo || user.cargo}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => setSelectedCargo(e.target.value)}
                        >
                        {(typeU) => <SelectItem className="text-black bg-white px-3" key={typeU.id_cargo}>{typeU.descr_cargo}</SelectItem>}
                        </Select>
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
              <Button color="primary" onPress={() => console.log(user)}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalUser;
