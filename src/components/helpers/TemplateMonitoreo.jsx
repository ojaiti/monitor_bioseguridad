import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import "../../css/mainBody.css"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';
import Regresiva from './Regresiva';


const TemplateMonitoreo = ({farms, lastFarmVisited, granjas, titulo, nombreTabla }) => {
    const { user:{ name, user_detail }} = useContext(AuthContext);
    const [ciudad, setCiudad] = React.useState(lastFarmVisited.farm_id);
    const [ciudad2, setCiudad2] = React.useState(farms[0].frm_id);
    const [loading, setLoading] = React.useState(false)
    const [takeScreen, setTakeScreen] =  useState(false)
    const [cumpleCuarentena, setCumpleCuarentena] = useState(false)
    const [hizoClickSiguiente, setHizoClickSiguiente] = useState(false)

    console.log('farms', farms[ciudad].frm_restriction)

    /* isVisitedRegistered */
    const [isVisitedRegistered, setIsVisitedRegistered] = useState(false)
    /* Click en guardar */
    /* Use Ref */
    var dateQuarantined = useRef({'days':0,'hours':0,'minutes':0,'seconds':0})

    /* Tiempo de carga para el loader */
    const timeLoader = 1000
    var cuarentena = useRef({'days':0,'hours':0,'minutes':0,'seconds':0})
    //Se obtiene los datos del usuario actual
    const [last_farm, setLastFarm] = useState(user_detail)


    /* Use Callback */
    
    const callback = useCallback((value) => {
        console.log('value', value)
        cuarentena.current = value
        /* setFinCuarentena(value); */
    }, []);
    /* Esta funcion dispara el Loader */
    const handleLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, timeLoader)
    }

   
    

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
            "frm_visited_quarantine_nights":granjas[parseInt(ciudad) - 1].noches[parseInt(ciudad2) - 1],
            "farm_frm_visited_id":parseInt(ciudad2),
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
            setCiudad(response.farm_frm_visited_id)
            fetch("http://127.0.0.1:8000/details_visited/"+response.user_frm_visited_id)
            .then(function(response) {
                return response.json();
            })
            .then(function(res){

                /* farm_frm_visited_id: 3
                frm_name: "SECCION 10"
                frm_visited_date: "2021-08-04T09:05:44.977000"
                id: 3
                username: "juan" */
                const user_detail2 = {
                    farm_frm_visited_id : res.FarmsVisited.frm_visited_id,
                    frm_name : res.Farm.frm_name,
                    frm_visited_date : res.FarmsVisited.frm_visited_date,
                    id : res.User.id,
                    username : res.User.username
                }
                setLastFarm(user_detail2)
                setIsVisitedRegistered(true)
            })

        });
        e.preventDefault()  
    }
    
    const handleChange2 = (event) => {
        setCiudad2(event.target.value);
        handleLoading()
        setHizoClickSiguiente(false)
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
    }
    
    return (
        <div className="main__body">
            {/* Tiempo Restante para tu proxima visita a granja */}
            {/* <CuentaRegresiva
            fecha={last_farm.frm_visited_date}
            noches = {noches == 0 ? -1 : noches}
            setFinCuarentena={setFinCuarentena} 
            /> */}

            <Regresiva 
            fecha={last_farm.frm_visited_date}
            forwardedRef={dateQuarantined}
            parentCallback={callback}
            isVisitedRegistered={isVisitedRegistered}
            />
            
            <h2 className="text-uppercase">{titulo}</h2>
            
            
            <h1>Nota: Revisa primero las restricciones existentes de <button className="btn btn-warning" type="button" onClick={handleClick}>BIOSEGURIDAD</button></h1>

            <h1>{name}</h1>
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
                    <p>{takeScreen? 'Tomar Captura': ''}</p>
                    <h4 className="mb-30">Restricción Actual</h4>
                    <div style={{ textAlign: 'center' }}>

                        {
                            ciudad === ciudad2 ? 'Libre' :
                            granjas[parseInt(ciudad) - 1].destinosConAutorizacion.includes(ciudad2) ? 'No deberá asistir / requiere autorización' :
                            granjas[parseInt(ciudad) - 1].destinosConPrevencion.includes(ciudad2) && 'Podrá asistir, utilizando ropa de tránsito limpia y proporcionada por la Operación.'
                        }
                        <br /><br /><br />
                        {
                            loading ? '' : farms[ciudad].frm_restriction[0].destinosConAutorizacion.includes(String(ciudad2)) ? farms[ciudad].frm_restriction[0].noches[parseInt(ciudad2) - 1] : ''
                        }

                        {
                            loading ? '' : farms[ciudad].frm_restriction[0].noches[parseInt(ciudad2) - 1] === 1 ? ' noche' : ' noches'
                        }
                        {
                            loading && <Loader
                                type="Oval"
                                color="#00BFFF"
                                height={30}
                                width={30}
                                timeout={timeLoader} //3 secs
                            />
                        }
                        
                        {cumpleCuarentena ?
                         <div>
                             <img className="logo-ojai" src='./assets/success.png' alt="Logo Ojai" />
                             <h6>SI CUMPLE CON CUARENTENA</h6>
                        </div> :
                         <div>
                             <img className="logo-ojai" src='./assets/danger.png' alt="Logo Ojai" />
                             <h5>NO CUMPLE CON CUARENTENA</h5>
                        </div>}
                        
                    </div>

                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="col-lg-2">
                   {
                    loading ? '' : <button type="button" onClick={verificarCuarentena} className="btn btn-primary">Siguiente</button>
                    }
                   {
                    cumpleCuarentena ? <button type="button" onClick={verificarTakeScreen} className="btn btn-primary">Siguiente</button> : ''
                    }
                    {
                            loading && <Loader
                                type="Oval"
                                color="#00BFFF"
                                height={30}
                                width={30}
                                timeout={timeLoader} //3 secs
                            />
                        }
                    </div>
                    <div className="col-lg-2">
                    {takeScreen ? cumpleCuarentena ? <button type="submit" className="btn btn-primary">Guardar</button> : '' : ''}
                    </div>
                </div>
            </form>







        </div>
    )
}
export default TemplateMonitoreo
