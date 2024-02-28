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


function ModalUser({ isOpen, onOpenChange, user }) {
    const [cargo, setCargo] = useState([]);
    const [typeU, setTypeU] = useState([]);
    const [selectedCargo, setSelectedCargo] = useState('');
    const [selectedTypeU, setSelectedTypeU] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [name, setName] = useState();
    const [mail, setMail] = useState();
    const [area, setArea] = useState();
    const [valor, setValor] = useState(0);
    const [id, setId] = useState();
    const [isLoading, setIsLoading] = useState(false)

    const cambiarValor = () => {
      setValor(valor === 1 ? 2 : 1);
    };

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
          setName(user && user.usuario)
          setMail(user && user.correo)
          setId(user && user.id_usuario)

          setValor(user && user.estatus ==='Activo' ? 1 : 2)
        };
    
        fetchData();
      }, [user]);
      
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
      }, [user]);

      useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")

        const fetchData = async () => {
          const response = await fetch('http://localhost:3001/areas', {
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
          setArea(data.areas);
        };
    
        fetchData();
      }, [user]);



      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Deshabilita el botón

        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")
      
        fetch('http://localhost:3001/updUsers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipo_u_admin: userData.tipoUsuario,
            cargo_admin: userData.cargo,
            token: token,
            id: id,
            name: name,
            mail: mail,
            typeU: selectedTypeU,
            cargo: selectedCargo,
            area:selectedArea,
            estatus:valor
          }),
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if(data.error){
            Swal.fire({
              title: data.error,
              icon: 'error',
              confirmButtonText: 'Cerrar'
            })
          }else{
            Swal.fire({
              title: 'Su usuario ha sido actualizado satisfactoriamente.',
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
                          {typeU.descr_tipo_usuario}
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

                <div className="-mx-3 flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        for="fName"
                        className="mb-3 block text-black font-medium text-[#07074D]"
                      >
                        Áreas
                      </label>

                      <Select
                        items={area}
                        placeholder={selectedArea || user.area}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => setSelectedArea(e.target.value)}
                        >
                        {(area) => <SelectItem className="text-black bg-white" key={area.id_area}>{area.descr_area}
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
                        Estatus
                      </label>
                      <button
                        onClick={cambiarValor}
                        className={`px-5 py-3 rounded-md text-black  ${valor === 1 ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'}`}
                      >
                        {valor === 1 ? 'Activo' : 'Inactivo'}
                      </button>
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
