"use client"

import React, { useState } from 'react'
import Swal from 'sweetalert2';

function Register() {
    const [user, setUser] = useState("");
    const [mail, setMail] = useState("");
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [errors, setErrors] = useState([]);
    const [isLoading, setIsLoading] =useState(false)

    const [conPass, setConPass] =useState("");

    const validatePassword = (password, conPass) => {
        let errors = [];
        if (!/(?=.*[A-Z])/.test(password)) {
          errors.push('Se requiere al menos una letra mayúscula.');
        }
        if (!/(?=.*\d)/.test(password)) {
          errors.push('Se requiere al menos un número.');
        }
        if (!/(?=.*[.,;:!?@#$%^&*(){}[\]-_+=~`|\\])/.test(password)) {
          errors.push('Se requiere al menos un signo de puntuación.');
        }
        if (!(password.length >= 8)) {
          errors.push('Se requieren al menos 8 caracteres.');
        }

        return errors;
      };
    
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
        setErrors(validatePassword(newPassword, conPass));
      };

      const handleSubmit = async(e) => {
        e.preventDefault();
        setIsLoading(true); 

        if (password !== conPass) {
            Swal.fire({
                title: "Las contraseñas no coinciden",
                icon: 'error',
                confirmButtonText: 'Cerrar'
              })
        } else if(errors.length > 0){
            Swal.fire({
                title: "Su contraseña no cumple con los requisitos.",
                icon: 'error',
                confirmButtonText: 'Cerrar'
              })
        }
        
        else{
            e.preventDefault();
            setIsLoading(true); // Deshabilita el botón
          
            fetch('http://localhost:3001/auth/register', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user: user,
                mail: mail,
                pass: password,
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
                    title: "Su usuario ha sido registrado exitosamente.",
                    text: "Será redireccionado en breve.",
                    icon: 'success',
                    confirmButtonText: 'Cerrar'
                  })
                  setTimeout(function(){
                    window.location.href = "/login";
                  }, 3000);   
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
        }
      }

    
  return (
<div className="container max-w-full mx-auto md:py-24 px-6 login_img_section pb-5" >
  <div className="max-w-sm mx-auto px-6 bg-white">
        <div className="relative flex flex-wrap">
            <div className="w-full relative">
                <div className="md:mt-6">
                    <div className="text-center font-semibold text-black">
                        Registrarse.
                    </div>
                    <div className="text-center font-base text-black">
                        Sistema de Gestión de red
                    </div>
                    <form className="mt-8" onSubmit={handleSubmit}>
                        <div className="mx-auto max-w-lg ">
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Nombre y Apellido</span>
                                <input placeholder="" type="text"
                                       className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none text-black" required value={mail} onChange={(e)=>setMail(e.target.value)} />
                            </div>
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Correo Institucional</span>
                                <input placeholder="" type="email"
                                       className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none text-black" required value={user} onChange={(e)=>setUser(e.target.value)} />
                            </div>
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Contraseña</span>
                                <input placeholder="" type="password" x-model="password"
                                       className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none text-black" required  value={password} onChange={handlePasswordChange} />
                            </div>
                            <div className="py-1">
                                <span className="px-1 text-sm text-gray-600">Confirmar Contraseña</span>
                                <input placeholder="" type="password" x-model="password_confirm"
                                       className="text-md block px-3 py-2 rounded-lg w-full
                bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none text-black" required value={conPass} onChange={(e)=>setConPass(e.target.value)} />
                            </div>
                            <div className="flex justify-start mt-3 ml-4 p-1">
                            {errors.length > 0 ? (
        <ul>
          {errors.map((error, index) => (
            <li className='text-red-400' key={index}>{error}</li>
          ))}
        </ul>
      ) : (
        <p className='text-green-500'>La contraseña es válida.</p>
      )}
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
                        </div>
                    </form>


                </div>
            </div>
        </div>
    </div>
</div>  )
}

export default Register