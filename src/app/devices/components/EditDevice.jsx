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




function ModalDevice({ isOpen, onOpenChange, dispo }) {
    const [data, setData] = useState()
    const [cargo, setCargo] = useState([]);
    const [typeU, setTypeU] = useState([]);
    const [selectedCargo, setSelectedCargo] = useState('');
    const [selectedTypeU, setSelectedTypeU] = useState('');
    const [selectedArea, setSelectedArea] = useState('');
    const [name, setName] = useState();
    const [mail, setMail] = useState();
    const [valor, setValor] = useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [agencies, setAgencies] = useState()
    const [SelectedAgencia, setSelectedAgencia] = useState();

    const [fab, setFab] = useState([])
    const [tipoE, setTipoE] = useState([])
    const [ag, setAg] = useState([])

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
          setCargo(data);        
        };
    
        fetchData();
      }, [isOpen, onOpenChange]);

      
      
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
          setTypeU(data);
        };
    
        fetchData();
      }, [isOpen, onOpenChange]);

      useEffect(()=>{
        const id_dispositivo = dispo && dispo.id_dispositivo

        const fetchData = async () => {
          const response = await fetch('http://localhost:3001/getCompDevice/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id_dispositivo: id_dispositivo
            }),
          });
          const data = await response.json();
          setData(data && data);
        };
        
        if(id_dispositivo !== null && id_dispositivo !== undefined){
          fetchData();
        }
      }, [isOpen, onOpenChange, dispo])

      useEffect(() => {
        setName(data && data.nombre_dispositivo)
        setMail(data && data.tipo_dispositivo)
        setSelectedTypeU(data && data.fabricante)
        setSelectedCargo(data && data.tipo_enlace )
        setSelectedArea(data && data.velocidad)
        setSelectedAgencia(data && data.id_agencia)
        setValor(data && data.estatus)
      }, [data]);
  
      const cambiarValor = (e) => {
        e.preventDefault()
        setValor(valor === 1 ? 2 : 1);
      };

            
      useEffect(() => {
        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")

        const fetchData = async () => {
          const response = await fetch('http://localhost:3001/resumeAgency/', {
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
          const resp = await response.json();
          setAgencies(resp.data);
        };
    
        fetchData();
      }, [cargo, typeU, isOpen, onOpenChange]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Deshabilita el botón

        const id_dispositivo = dispo && dispo.id_dispositivo


        const userData = JSON.parse(localStorage.getItem("userData"))
        const token = localStorage.getItem("token")
        console.log(selectedArea.label)
        console.log(selectedArea)


        fetch('http://localhost:3001/editDevice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            tipo_u_admin: userData.tipoUsuario,
            cargo_admin: userData.cargo,
            token: token,
            id_disp: id_dispositivo,
            disp: name,
            model: mail,
            manufac: fab,
            typelink: tipoE,
            vel: selectedArea.label,
            id_agencia: ag,
            estatus:valor
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
              title: data.msg,
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
          setTimeout(()=>{
            window.location.href = "/devices/"
          },2000)
        });
      };

      let fabricante = typeU &&typeU.find(item => item.id_fabricante === selectedTypeU)
      let tipo_enlace = cargo && cargo.find(item => item.cod_tipo_enlace === selectedCargo);
      let agencias = agencies && agencies.find(item => item.id_agencia === SelectedAgencia)


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
              Editar Dispositivo
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
                        placeholder={selectedTypeU ? fabricante.fabricante : "Seleccione un fabricante."}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => {
                          let selectedId = e.target.value;
                          let selectedObject = typeU.find(item => item.id_fabricante === selectedId);
                          setSelectedTypeU(selectedObject);
                          setFab(e.target.value)
                        }}
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
                        placeholder={selectedCargo ? tipo_enlace.tipo_enlace : "Seleccione un tipo de enlace."}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => {
                          let selectedId = e.target.value;
                          let selectedObject = cargo.find(item => item.cod_tipo_enlace === selectedId);
                          setSelectedCargo(selectedObject);
                          setTipoE(e.target.value)
                        }}
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
                        Velocidad
                      </label>
                      <Select
                        items={velocidades}
                        placeholder={selectedArea ? selectedArea : "Seleccione una velocidad media."}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => {
                          let selectedId = e.target.value;
                          let selectedObject = velocidades.find(item => item.value == selectedId);
                          setSelectedArea(selectedObject)}}
                        >
                        {(area) => <SelectItem className="text-black bg-white" key={area.value}>{area.label}
                            </SelectItem>}
                        </Select>

                    </div>
                  </div>
                  <div className="w-full px-3 sm:w-1/2">
                  <div className="mb-5">
                      <label
                        for="fName"
                        className="mb-3 block text-black font-medium text-[#07074D]"
                      >
                        Agencias
                      </label>
                      <Select
                        items={agencies && agencies}
                        placeholder={SelectedAgencia ? agencias.nombre_agencia : "Seleccione una velocidad media."}
                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-black font-medium text-[#6B7280] outline-none focus:border-red-700 focus:shadow-md"
                        onChange={(e) => {
                          let selectedId = e.target.value;
                          let selectedObject = agencies.find(item => item.id_agencia === selectedId);
                          setSelectedAgencia(selectedObject);
                          setAg(e.target.value)
                        }}
                        >
                        {(agencie) => <SelectItem className="text-black bg-white" key={agencie.id_agencia}>{agencie.nombre_agencia}
                            </SelectItem>}
                        </Select>

                    </div>
                    <div>
                      <label
                        for="lName"
                        className="mb-3 block text-black font-medium text-[#07074D]"
                      >
                        Estatus
                      </label>
                      <button type="submit"
                        onClick={(e)=>{cambiarValor(e)}}
                        className={`px-5 py-3 rounded-md text-black  ${valor === 1 ? 'bg-green-500 hover:bg-green-400' : 'bg-red-500 hover:bg-red-400'}`}
                      >
                        {valor === 1 ? 'Activo' : 'Inactivo'}
                      </button>
                    </div>
                  </div>
                </div>

                <div>
                  <button className="hover:shadow-form rounded-md bg-red-700 py-3 px-8 text-center text-black font-semibold text-white outline-none">
                    Guardar
                  </button>
                </div>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cerrar
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default ModalDevice;
