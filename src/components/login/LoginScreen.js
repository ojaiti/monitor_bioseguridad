import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'
import '../../css/login.css'
import { useForm } from '../../hooks/useForm'
import axios from 'axios'
/* RECURSO HEROKU
const response = await fetch("https://fastapitest1.herokuapp.com/users/")
*/
export const LoginScreen = () => {
	/* CONSTANTES PARA MANEJO DEL USAURIO Y ERRORES */
    const [ values, handleInputChange, reset ] =  useForm({username: '',password: ''})
    const [errorLogin, setErrorLogin] = useState(null)
    const {username, password} = values
    const URL = process.env.REACT_APP_API_TEST+"auth/login"
	const {dispatch} = useContext(AuthContext)
    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post(URL, {username, password} /* Mandamos el username y password como payload */)
        .then(response => {
			dispatch({
				type: types.login,
				payload:{
				  name:username,
				  token: response.access,
				  refresh: response.refresh
				}
			})
			console.log(response)
		})
        .catch(error => setErrorLogin(error.message))
		/* Reseteamos el formulario */
		reset()
		
    }
  
    return (
        <div className="container__login">
            <div className="card__form">
                <form onSubmit={handleSubmit} method="post">
                  <div className="d-flex justify-content-around align-items-center flex-column mb-3">
                    <img className="mb-2" width="100" src="./assets/logos/logo_ojai.png" alt="Logo Ojai"/>
                    <h5 className="m-0"><b>MONITOR</b> BIOSEGURIDAD</h5>
                    <p className="elaborado">Programa Interno para uso de la empresa</p>
                  </div>
                  <div className="group">
                    <input  type="hidden"  name="grant_type" value="password"/>
                    <input autoComplete='false' type="text" onChange={handleInputChange} name="username" value={username} placeholder="Escribe tu usuario"/>
                    <input autoComplete='false' type="password" onChange={handleInputChange} name="password" value={password} placeholder="Escribe tu contraseña"/>
                    <input autoComplete='false' className="primary__color" type="submit" value="Entrar"/>
                    {/* Mostramos error en caso de que exista */}
					<div className="text-center">
                      {errorLogin != null && 'No estas autorizado'}
                    </div>
                  </div>

                  <div className="mt-5 text-center elaborado">
                     Elaborado por el departamento de Sistemas
                  </div>
                </form>
            </div>
        </div>
    )
}

