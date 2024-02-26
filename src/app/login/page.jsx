"use client"

import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useState } from "react";
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Deshabilita el botón
  
    fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
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
        localStorage.setItem("token", data.token),
        localStorage.setItem("userData", JSON.stringify(data.userData)),
        window.location.href="/dashboard"
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
    <>
      <div className="h-screen flex">
        <div
          className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center"
        >
          <div
            className=" 
                  bg-black 
                  opacity-20 
                  inset-0 
                  z-0"
          ></div>
          <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
            <h1 className="text-white font-bold text-4xl font-sans">Sistema de Gestión de red</h1>
            <p className="text-white mt-1">Sistema de gestión, monitoreo y control de las redes de
telecomunicaciones alámbricas e inalámbricas</p>
            <div className="flex justify-center lg:justify-start mt-6">

            </div>
          </div>
        </div>
        <div className="flex w-full lg:w-1/2 justify-center items-center bg-white space-y-8">
          <div className="w-full px-8 md:px-32 lg:px-24">
            <form className="bg-white rounded-md shadow-2xl p-5" onSubmit={handleSubmit}>
              <h1 className="text-gray-800 font-bold text-2xl mb-1">
                Iniciar Sesión
              </h1>
              <p className="text-sm font-normal text-gray-600 mb-8">Bienvenido de vuelta</p>
              <div className="flex items-center border-2 mb-8 py-2 px-3 rounded-2xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
                <input
                  id="email"
                  className=" pl-2 w-full outline-none border-none text-black"
                  type="email"
                  name="email"
                  placeholder="Correo"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                />
              </div>
              <div className="flex items-center border-2 mb-12 py-2 px-3 rounded-2xl ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="pl-2 w-full outline-none border-none text-black"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <span onClick={toggleShowPassword} className="text-black" style={{ cursor:"pointer" }}>
                  {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />}
                </span>


              </div>
              <button
                type="submit"
                className="block w-full bg-red-600 mt-5 py-2 rounded-2xl hover:bg-red-700 hover:-translate-y-1 transition-all duration-500 text-white font-semibold mb-2"
                disabled={isLoading}
              >
                {isLoading ? <span> <svg aria-hidden="true" role="status" class="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
<path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
</svg>     <span>Cargando</span>
 </span>  : 'Iniciar sesión'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
