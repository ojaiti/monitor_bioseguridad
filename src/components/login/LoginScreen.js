import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types'
import '../../css/login.css'

/* RECURSO HEROKU
const response = await fetch("https://fastapitest1.herokuapp.com/users/")
*/
export const LoginScreen = () => {

    const [username, setUsername] = useState('')
    const [password, setpassword] = useState('')
    const [errorMessage, setErrorMessage] = useState({
      isError : false,
      showError : ''
    })

    const {dispatch} = useContext(AuthContext)
  
  

   /* useEffect(() => {
    loginPost()

    
  },[])  */


  
    

  const handleSubmit = async (e) => {
      e.preventDefault()
      
      
      if(username !== '' && password !== ''){
        
        const response = await fetch(`${process.env.REACT_APP_API_PRODUCTION}token`, {
          /* Aqui se trabaja el login */
          mode: 'cors',
          body: `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
            'Access-Control-Allow-Origin': '*',
          },
          method: "POST"
        })
      
        const tokenResponse = await response.json()
        /* vERIFICAMOS QUE EXISTA UN TOKEN */

        if(tokenResponse.hasOwnProperty("access_token")){
          //Get User details
          fetch(`${process.env.REACT_APP_API_PRODUCTION}users/me/`, {
                
            /* Aqui se obtiene la request a la info del usuario */
            headers: {
              Accept: "application/json",
              "Authorization": 'Bearer '+tokenResponse.access_token,
               
            },
            method: "GET"
          })
          .then(function(response){
            return response.json();
          })
          .then(function(json) {
            fetch(`${process.env.REACT_APP_API_PRODUCTION}last_farm_visited_by_user/`+json.id)
            .then(function(response) {
              return response.json();
            })
            .then(function(json2){
              fetch(`${process.env.REACT_APP_API_PRODUCTION}farms/`+json2[0].FarmsVisited.farm_frm_visited_id)
              .then(function(response) {
                return response.json();
              })
              
              .then(function(json3){
                const user_detail = {
                  "id":json.id,
                  "username": json.username,
                  "nombre": json.nombre,
                  "apellidos": json.apellidos,
                  "frm_name" : json2[0].Farm.frm_name,
                  "frm_visited_date": json2[0].FarmsVisited.frm_visited_date,
                  "farm_frm_visited_id": json2[0].FarmsVisited.farm_frm_visited_id,
                  "quarentine_nights": json2[0].FarmsVisited.frm_visited_quarantine_nights,
                  "reg_id" : json3.region_frm_id,
                  "visible_farms":json.visible_farms
                }
              /*console.log('jason',json)
                console.log('jason2',json2)
                console.log('jason3',json3) */
                dispatch({
                    type: types.login,
                    payload:{
                      name:username,
                      token:tokenResponse.access_token,
                      user_detail: user_detail
                    }
                })
              })
            })
          });

      /* const userResponse = await getUserMe.json() */

      
      
        }else{
          setErrorMessage({
              isError : true,
              showError : tokenResponse.detail
            })
        }
    }else{

      setErrorMessage(
        {
          isError : true,
          showError : 'Escribe tus credenciales'
        }
      )
      
    }
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
                    <input type="hidden"  name="grant_type" value="password"/>
                    <input type="text" onChange={(e)=> setUsername(e.target.value)} name="username" value={username} placeholder="Escribe tu usuario"/>
                    <input type="password" onChange={(e)=> setpassword(e.target.value)} name="password" value={password} placeholder="Escribe tu contrase??a"/>
                    <input className="primary__color" type="submit" value="Entrar"/>
                    <div className="text-center">
                      {errorMessage.isError ? errorMessage.showError : ''}
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

