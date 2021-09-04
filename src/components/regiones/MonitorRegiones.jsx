import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import getFarmsByRegion from '../helpers/API/getFarmsById'
import lastOneFarmVisitedByUser from '../helpers/API/lastOneFarmVisitedByUser'
import Regresiva from '../helpers/Regresiva';
import regiones from '../../data/regiones'
import { MenuItem, TextField } from '@material-ui/core'
import { useHistory } from 'react-router'

const MonitorRegion = () => {


    const [ciudad, setCiudad] = React.useState('1');
    const [ciudad2, setCiudad2] = React.useState('2');
    const [farms, setFarms] = useState(null)
    const [hizoClickSiguiente, setHizoClickSiguiente] = useState(false)
    const [cumpleCuarentena, setCumpleCuarentena] = useState(false)
    const [loading, setLoading] = React.useState(false)
    const [farmId, setFarmId]  = useState(1)
    const [farmVisitedByUser, setfarmVisitedByUser] = useState(null)
    const [nochesFarmId, setNochesFarmId] = useState(null)
    const { user:{ user_detail }} = useContext(AuthContext);
    const titulo = 'Regiones';
    const nombreTabla = 'tablaregiones'

     useEffect(() => {
        farmsByRegion(1)
        lastOneFarmByUser(user_detail.id)
    },[user_detail.id])

    const farmsByRegion = (region) => {
        var extract = [] /* Array para cambiar el id de las granjas por el frm_id */
        var nochesWithFarmId = [] /* Array para cambiar el indice y comparar con noches y dias autorizados */
        getFarmsByRegion(region)
        .then((data)=>{
            /* Si se borra un id de alguna granja el programa podria caerse */
            setFarmId(data[0].frm_id)
            console.log('restriction', data[0].frm_restriction)
            /* Agreamos la clave de la granja como indice al array de granjas */
            var count = 0;
            data.map((farm, index) => {
               extract[farm.frm_id] = farm
               nochesWithFarmId[farm.frm_id] = count
               count++;
            })
            setNochesFarmId(nochesWithFarmId)
            setFarms(extract)
            count = 0
        })
    }

    const verificarCuarentena = (event) => {
        setHizoClickSiguiente(true)
        if(cuarentena.current.days > 0 || cuarentena.current.hours > 0 || cuarentena.current.minutes > 0 || cuarentena.current.seconds > 0){
            setCumpleCuarentena(false)
        }
        else{
            setCumpleCuarentena(true)
        }
    }

    const lastOneFarmByUser = (user_id) => {
        lastOneFarmVisitedByUser(user_id)
        .then((data) => {
            setCiudad(data[0].Farm.region_frm_id)
            console.log('Farm_lastvisited_Regions', data)
            setfarmVisitedByUser({
                "farm_frm_visited_id": data[0].Farm.frm_id,
                "frm_visited_name": data[0].Farm.frm_name,
                "frm_visited_date": data[0].FarmsVisited.frm_visited_date,
                "quarentine_nights": data[0].FarmsVisited.frm_visited_quarantine_nights
            })
        })
    }

    let history = useHistory();
    const handleClick = () => {
        history.push("/" + nombreTabla);
    }
    
    var cuarentena = useRef({'days':0,'hours':0,'minutes':0,'seconds':0})
    const callback = useCallback((value) => {
        cuarentena.current = value
    }, []);

    const handleSubmit = () => {
        console.log('¿sumit')
    }
    const handleChange2 = (event) => {
        console.log('a')
        setCiudad2(event.target.value);
        console.log('uu', event.target.value)
    };
    if (!farms) return null;
    if (!farmVisitedByUser) return null;
    return (
        
        <div className="main__body">
             <Regresiva 
                parentCallback={callback}
                lastDateVisitedFarm = {farmVisitedByUser}
                />
            <h2 className="text-uppercase">{titulo}</h2>
            
            <h1>Nota: Revisa primero las restricciones existentes de <button className="btn btn-warning" type="button" onClick={handleClick}>BIOSEGURIDAD</button></h1>

            <h1>{user_detail.nombre} {user_detail.apellidos}</h1>

            <form
                className="main__body"
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
                           /*  helperText={'Ultima visita: ' +lastFarmVisited.farm_name +' '+lastFarmVisited.farm_date} */
                        >
                            {regiones.map((region) => (
                                <MenuItem key={region.value} value={region.value}>
                                    {region.label.toUpperCase()}
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

                            {regiones.map((region) => (
                                <MenuItem key={region.value} value={region.value}>
                                    {region.label.toUpperCase()}
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
                    {/* <p className="text-danger h4">{takeScreen? 'Tomar Captura': ''}</p> */}
                    <h4 className="mb-30">Restricción Actual</h4>
                    <div style={{ textAlign: 'center' }}>
                        <br /><br />
                        { loading ? '' : regiones[ciudad -1].noches[parseInt(ciudad2) - 1]}
                        { loading ? '' : regiones[ciudad -1].noches[parseInt(ciudad2) - 1] === 1 ? ' noche' : ' noches'}
                       {/*  { loading && <Loader type="Oval" color="#00BFFF" height={30} width={30} timeout={timeLoader} /> } */}
                        {/* {
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
                        } */}
                    </div>
                </div>
                
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="col-lg-2">
                        { loading ? '' : <button type="button" onClick={verificarCuarentena} className="btn btn-primary">Siguiente</button>}

                        {/* { hizoClickSiguiente ? <button type="button" onClick={verificarTakeScreen} className="btn btn-primary">Siguiente</button> : ''}
                        {loading && <Loader type="Oval" color="#00BFFF" height={30} width={30} timeout={timeLoader}  />}  */}
                    </div>
                    <div className="col-lg-2">
                        {/* { hizoClickSiguiente2 ? takeScreen ? cumpleCuarentena ? <button type="submit" onClick={()=>{return true}} className="btn btn-primary">Guardar</button> : '' : '' : ''} */}
                    </div>
                </div>
            </form>
        </div>
    )
}
/* ARREGLAR MONITOREO REGIONES */
export default MonitorRegion
