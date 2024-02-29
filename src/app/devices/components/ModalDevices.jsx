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


function ModalDevice({ isOpen, onOpenChange }) {
  
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

    const velocidades = [
      {value: 1, label: "3 Mbps"},
      {value: 2, label: "5 Mbps"},
      {value: 3, label: "10 Mbps"},
      {value: 4, label: "15 Mbps"},
      {value: 5, label: "30 Mbps"},
      {value: 6, label: "50 Mbps"},

    ]

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")

        const fetchData = async () => {
          const response = await fetch('http://localhost:3001/typeLink/', {
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
          console.log(data)
          setCargo(data);        };
    
        fetchData();
      }, []);
      
      useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")

        const fetchData = async () => {
          const response = await fetch('http://localhost:3001/manufacturer/', {
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
          console.log(data)
          setTypeU(data);
        };
    
        fetchData();
      }, []);



      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Deshabilita el botón

        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")
      
        fetch('http://localhost:3001/addDevices', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tipo_u_admin: userData.tipoUsuario,
            cargo_admin: userData.cargo,
            token: token,
            disp: name,
            model: mail,
            manufac: selectedTypeU,
            typelink: selectedCargo,
            vel: velocidades[parseInt(selectedArea)+1].label,
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
                        Identificador del Dispositivo
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
                  <div className="w-full px-3 sm:w-1/2">
                    <div className="mb-5">
                      <label
                        for="lName"
                        className="mb-3 block text-black font-medium text-[#07074D]"
                      >
                        Modelo del Dispositivo
                      </label>
                      <input
                        type="text"
                        name="lName"
                        id="lName"
                        maxLength={10}
                        placeholder="Modelo del Dispositivo"
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
                        Fabricante
                      </label>
                      <Select
                        items={typeU}
                        placeholder={selectedTypeU ? selectedTypeU : "Seleccione un fabricante."}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => setSelectedTypeU(e.target.value)}
                        >
                        {(typeU) => <SelectItem className="text-black bg-white" key={typeU.id_fabricante}>
                          {typeU.fabricante}
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
                        Tipo de Enlace
                      </label>
                      <Select
                        items={cargo}
                        placeholder={selectedCargo ? selectedTypeU : "Seleccione un tipo de enlace."}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => setSelectedCargo(e.target.value)}
                        >
                        {(cargo) => <SelectItem className="text-black bg-white px-3" key={cargo.cod_tipo_enlace}>{cargo.tipo_enlace}</SelectItem>}
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
                        items={velocidades}
                        placeholder={selectedArea ? selectedArea : "Seleccione una velocidad media."}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => setSelectedArea(e.target.value)}
                        >
                        {(area) => <SelectItem className="text-black bg-white" key={area.value}>{area.label}
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
                      <button type="submit"
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalDevice;
