import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import "../../css/mainBody.css"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';
import Regresiva from './Regresiva';
import lastOneFarmVisitedByUser from './API/lastOneFarmVisitedByUser';


const TemplateMonitoreo = ({farms, nochesFarmId, lastFarmVisited, farmId, granjas, titulo, nombreTabla }) => {
    const { user:{user_detail }} = useContext(AuthContext);
    const [ciudad, setCiudad] = React.useState(lastFarmVisited.farm_id);
    const [ciudad2, setCiudad2] = React.useState(farmId);
    const [loading, setLoading] = React.useState(false)
    const [takeScreen, setTakeScreen] =  useState(false)
    const [cumpleCuarentena, setCumpleCuarentena] = useState(false)
    const [hizoClickSiguiente, setHizoClickSiguiente] = useState(false)
    const [hizoClickSiguiente2, setHizoClickSiguiente2] = useState(false)
    const [cambioGranja, setCambioGranja] = useState(false)
    /* Envio de ultima fecha de la granja visitada mas noches */
    const [lastDateVisitedFarm, setLastDateVisitedFarm ] = useState(null)
    const [testRederizado, setTestRenderizado] = useState(false)
    const [ejecutar, setEjecutar] = useState(false)

    const [enviarDato, setEnviarDato] = useState(false)
    /* isVisitedRegistered */
    const [isVisitedRegistered, setIsVisitedRegistered] = useState(false)
    /* Click en guardar */
    const [clickGuardar, setClickGuardar] = useState(false)
    /* Use Ref */
    var dateQuarantined = useRef({'days':0,'hours':0,'minutes':0,'seconds':0})

    /* Tiempo de carga para el loader */
    const timeLoader = 1000
    var cuarentena = useRef({'days':0,'hours':0,'minutes':0,'seconds':0})
    //Se obtiene los datos del usuario actual
    const [last_farm, setLastFarm] = useState(user_detail)

    /* Use Callback */
    const callback = useCallback((value) => {
        cuarentena.current = value
    }, []);
    /* Esta funcion dispara el Loader */
    const handleLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, timeLoader)
    }


    const lastOneFarmByUser = (user_id) => {
        console.log('EXECUTE')
        lastOneFarmVisitedByUser(user_id)
        .then((data) => {
          const user_detail = {
              "creado": true,
            "farm_frm_visited_id": data[0].FarmsVisited.farm_frm_visited_id,
            "frm_visited_date": data[0].FarmsVisited.frm_visited_date,
            "quarentine_nights": data[0].FarmsVisited.frm_visited_quarantine_nights
          }
            console.log('data user', data[0])
            console.log('data user_detail', user_detail)

            setLastDateVisitedFarm(user_detail)
            setTestRenderizado(true)

            /* Actualizar un vez mas este useState */
            
        })
      }

   useEffect(() => {
    console.log('Hello')
    lastOneFarmByUser(user_detail.id)
    
   }, [])


    

    /* Get all farms by region */
    
    /* Function para cambiar a la seccion de BIOSEGURIDAD */
    let history = useHistory();
    const handleClick = () => {
        history.push("/" + nombreTabla);
    }
    /* Submit */
    const handleSubmit = (e) => {

        var url = 'http://127.0.0.1:8000/farm_visited';
        var data = {
            "frm_visited_date": new Date(),
            "frm_visited_quarantine_nights":farms[ciudad].frm_restriction[0].noches[nochesFarmId[ciudad2]],
            "farm_frm_visited_id": ciudad2,
            "user_frm_visited_id": user_detail.id
        };

        fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response)
            setCiudad(ciudad2)
            fetch("http://127.0.0.1:8000/details_visited/"+response.user_frm_visited_id)
            .then(function(response) {
                return response.json();
            })
            .then(function(res){
                const user_detail2 = {
                    farm_frm_visited_id : res.FarmsVisited.frm_visited_id,
                    frm_name : res.Farm.frm_name,
                    frm_visited_date : res.FarmsVisited.frm_visited_date,
                    id : res.User.id,
                    username : res.User.username,
                    quarentine_nights: res.FarmsVisited.frm_visited_quarantine_nights
                }
                setLastFarm(user_detail2)

                setLastDateVisitedFarm(user_detail2)
                setIsVisitedRegistered(true)
            })

        });

        /* Actualizar la cuenta regresiva */
        setEnviarDato(true)
        setClickGuardar(true)
        setEjecutar(true)
        
        e.preventDefault()  
    }
    
    const handleChange2 = (event) => {
        event.preventDefault()
        setHizoClickSiguiente(false)
        setHizoClickSiguiente2(false)
        setCiudad2(event.target.value);
        handleLoading()
    };
/* Cumple o no Con Cuarentena */
    const verificarCuarentena = (event) => {
        setHizoClickSiguiente(true)
        if(cuarentena.current.days > 0 || cuarentena.current.hours > 0 || cuarentena.current.minutes > 0 || cuarentena.current.seconds > 0){
            setCumpleCuarentena(false)
            console.log('No cumple cuarentena')
        }
        else{
            setCumpleCuarentena(true)
            console.log(' cumple cuarentena')
        }
    }
    const verificarTakeScreen = () => {
        hizoClickSiguiente ? setTakeScreen(true) : setTakeScreen(false)
        setHizoClickSiguiente2(true)
    }
    
    return (
        <div className="main__body">
            {/* Tiempo Restante para tu proxima visita a granja */}
            
            {!testRederizado ? '' :
                <Regresiva 
                fecha={last_farm.frm_visited_date}
                forwardedRef={dateQuarantined}
                parentCallback={callback}
                isVisitedRegistered={isVisitedRegistered}
                lastDateVisitedFarm = {lastDateVisitedFarm}
                />
            }
            <h2 className="text-uppercase">{titulo}</h2>
            
            <h1>Nota: Revisa primero las restricciones existentes de <button className="btn btn-warning" type="button" onClick={handleClick}>BIOSEGURIDAD</button></h1>

            <h1>{user_detail.nombre} {user_detail.apellidos}</h1>
            <form
                style={{ backgroundImage: `url("./assets/pie_pagina_ojai.png")` }}
                onSubmit={(e)=>{handleSubmit(e)}}
                noValidate autoComplete="off">
                <div className="content-form" >
                    <div className="mb-10">
                        <h4>Origen</h4>
                        <TextField
                            disabled
                            id="standard-select-currency"
                            select
                            label="Select"
                            value={ciudad}
                            /* Show Date of your last visit */
                            helperText={'Ultima visita: ' +lastFarmVisited.farm_name +' '+lastFarmVisited.farm_date}
                        >
                            {farms.map((option) => (
                                <MenuItem key={option.frm_id} value={option.frm_id}>
                                    {option.frm_name.toUpperCase()}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* Resolver Error */}
                    </div>
                    <div className="mb-30">
                        <span>Estatus (Origen) {' '}</span>
                        <span className={farms[ciudad].frm_restriction[0].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {farms[ciudad].frm_restriction[0].status}
                        </span>
                    </div>
                    <div className="mb-10">
                        <h4>Destino</h4>

                        <TextField
                            disabled={false}
                            id="standard-select-currency2"
                            select
                            label="Select"
                            value={ciudad2}
                            onChange={handleChange2}
                            helperText="Porfavor selecciona el destino"
                        >

                            {farms.map((option) => (
                                <MenuItem key={option.frm_id} value={option.frm_id}>
                                    {option.frm_name.toUpperCase()}
                                </MenuItem>
                            ))}
                        </TextField>

                               
                    </div>
                    <div className="mb-10">
                        <span>Estatus (Destino) {' '}</span>
                        <span className={farms[ciudad2].frm_restriction[0].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {farms[ciudad2].frm_restriction[0].status}
                        </span>
                    </div>
                    
                </div>

                <div className="show__restriccion">
                    <p className="text-danger h4">{takeScreen? 'Tomar Captura': ''}</p>
                    <h4 className="mb-30">Restricción Actual</h4>
                    <div style={{ textAlign: 'center' }}>
                       
                        <br /><br />
                        
                        { loading ? '' : farms[ciudad].frm_restriction[0].noches[nochesFarmId[ciudad2]]}
                        { loading ? '' : farms[ciudad].frm_restriction[0].noches[nochesFarmId[ciudad2]] === 1 ? ' noche' : ' noches'}
                        { loading && <Loader type="Oval" color="#00BFFF" height={30} width={30} timeout={timeLoader} /* 3 secs */ /> }
                        
                        {
                        !hizoClickSiguiente ? '' : cumpleCuarentena  ?
                            <div>
                            <img className="logo-ojai" src='./assets/success.png' alt="Logo Ojai" />
                            <h6>SI CUMPLE CON CUARENTENA</h6>
                            </div>
                          :
                         <div>
                             <img className="logo-ojai" src='./assets/danger.png' alt="Logo Ojai" />
                             <h5>NO CUMPLE CON CUARENTENA</h5>
                        </div>
                        }
                        
                    </div>

                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="col-lg-2">
                        {loading ? '' : <button type="button" onClick={verificarCuarentena} className="btn btn-primary">Siguiente</button>}
                        { hizoClickSiguiente ? <button type="button" onClick={verificarTakeScreen} className="btn btn-primary">Siguiente</button> : ''}
                        {loading && <Loader type="Oval" color="#00BFFF" height={30} width={30} timeout={timeLoader} /* 3 sec */ />}
                    </div>
                    <div className="col-lg-2">
                        { hizoClickSiguiente2 ? takeScreen ? cumpleCuarentena ? <button type="submit" onClick={()=>{return true}} className="btn btn-primary">Guardar</button> : '' : '' : ''}
                    </div>
                </div>
            </form>
        </div>
    )
}
export default TemplateMonitoreo
