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
import RegionNoVisible from './RegionNoVisible';

/* Modal Confiramacion */

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const TemplateMonitoreo = ({farms, nochesFarmId, lastFarmVisited, farmId, titulo, nombreTabla }) => {
    const { user:{user_detail }} = useContext(AuthContext);
    const [ciudad, setCiudad] = React.useState(lastFarmVisited.farm_id);
    const [ciudad2, setCiudad2] = React.useState(farmId);
    const [loading, setLoading] = React.useState(false)
    const [takeScreen, setTakeScreen] =  useState(false)
    const [open, setOpen] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);

    const [cumpleCuarentena, setCumpleCuarentena] = useState(false)
    const [hizoClickSiguiente, setHizoClickSiguiente] = useState(false)
    const [hizoClickSiguiente2, setHizoClickSiguiente2] = useState(false)
    /* Envio de ultima fecha de la granja visitada mas noches */
    const [lastDateVisitedFarm, setLastDateVisitedFarm ] = useState(null)
    const [testRederizado, setTestRenderizado] = useState(false)
    /* Tiempo de carga para el loader */
    const timeLoader = 1500
    var cuarentena = useRef({'days':0,'hours':0,'minutes':0,'seconds':0})
    

    /* Use Callback */
    const callback = useCallback((value) => {
        cuarentena.current = value
        console.log(value)
        if(cuarentena.current.days > 0 || cuarentena.current.hours > 0 || cuarentena.current.minutes > 0 || cuarentena.current.seconds > 0){
            console.log('NO CUMPLE LA CUARENTENA')
            setCumpleCuarentena(false)
            setLoading(false)
        }
        else{
            console.log('SI CUMPLE LA CUARENTENA')
            
            setCumpleCuarentena(true)
        }
    }, []);
    /* Esta funcion dispara el Loader */
    const handleLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, timeLoader)
    }


    const lastOneFarmByUser = (user_id) => {
        lastOneFarmVisitedByUser(user_id)
        .then((data) => {
          const user_detail = {
            "farm_frm_visited_id": data[0].FarmsVisited.farm_frm_visited_id,
            "frm_visited_date": data[0].FarmsVisited.frm_visited_date,
            "quarentine_nights": data[0].FarmsVisited.frm_visited_quarantine_nights
          }
            setLastDateVisitedFarm(user_detail)
            setTestRenderizado(true)
            /* Actualizar un vez mas este useState */
            
        })
      }

   useEffect(() => {
    lastOneFarmByUser(user_detail.id)
    handleLoading()
   }, [])

const handleClickOpen = () => {
        setOpen(true);
      };
   const handleClose = () => {
    setOpen(false);
    setConfirm(false);
  };
  const handleConfirm = () => {
      setOpen(false);
      setConfirm(true);
  }
    /* Function para cambiar a la seccion de BIOSEGURIDAD */
    let history = useHistory();
    const handleClick = () => {
        history.push("/" + nombreTabla);
    }
    /* Submit */
    const handleSubmit = (e) => {
        /* Obtenemos la noche dependiendo de la granja seleccionada */
        var noches = farms[ciudad].frm_restriction[0].noches[nochesFarmId[ciudad2]] === '-' ? '0' : farms[ciudad].frm_restriction[0].noches[nochesFarmId[ciudad2]]
        /* Obtenemos la fecha actual */
        const dateNow = new Date()
        /* Obtenemos la fecha de la ultima granja visitada por usuario */
        const dateFinal = new Date(lastDateVisitedFarm.frm_visited_date)
        /* Agregagmos las nocghes correspondientes a la fecha de la ultima granja visitada */
        const dateWithNights = dateFinal.setDate(dateFinal.getDate() + noches);
        /* Convertimos la fecha de la ultima granja + noches a tipo Date */
        const dateObjectWithNights = new Date(dateWithNights)

        /* comprobacion de la ultima granja visitada con la actual */

        if(dateObjectWithNights.getTime() < dateNow.getTime()){
            var noches = 0;
        }

        console.log('------ ENTER', noches )
        var url = `${process.env.REACT_APP_API_PRODUCTION}farm_visited`;
        var data = {
            "frm_visited_date": new Date(),
            "frm_visited_quarantine_nights": noches,
            "farm_frm_visited_id": ciudad2,
            "user_frm_visited_id": user_detail.id,
            "frm_visited_is_region": 0

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
            setCiudad(ciudad2)
            fetch(`${process.env.REACT_APP_API_PRODUCTION}details_visited/`+response.user_frm_visited_id)
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
                setLastDateVisitedFarm(user_detail2)
            })
        });

        /* Actualizar la cuenta regresiva */
        
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
        
    }
    const verificarTakeScreen = () => {
        hizoClickSiguiente ? setTakeScreen(true) : setTakeScreen(false)
        setHizoClickSiguiente2(true)
    }
    if(farms[ciudad]?.frm_restriction[0] === undefined){
        return <RegionNoVisible />
    }

    console.log('Cumple cuarentena', cumpleCuarentena)
    return (
        <div className="main__body">
            {/* Tiempo Restante para tu proxima visita a granja */}
            
            {!testRederizado ? '' :
                <Regresiva 
                parentCallback={callback}
                lastDateVisitedFarm = {lastDateVisitedFarm}
                />
            }


             {/* Dialog confirmacion */}
             <div>
        
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">{"Estas seguro de elegir esta visita?"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
              Una vez que des click guardar no habra marcha atras hasta que termine la cuarentea.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancelar
            </Button>
            <Button onClick={handleConfirm} color="primary">
              Aceptar
            </Button>
          </DialogActions>
        </Dialog>
      </div>

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
                            disabled={!cumpleCuarentena}
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
                        {!cumpleCuarentena? '': loading ? '' : farms[ciudad].frm_restriction[0].noches[nochesFarmId[ciudad2]] === '00' ? 0 : farms[ciudad].frm_restriction[0].noches[nochesFarmId[ciudad2]]}
                        {!cumpleCuarentena? '': loading ? '' : farms[ciudad].frm_restriction[0].noches[nochesFarmId[ciudad2]] === 1 ? ' noche' : ' noches'}
                        {!cumpleCuarentena? '': loading && <Loader type="Oval" color="#00BFFF" height={30} width={30} timeout={timeLoader} /* 3 secs */ /> }
                        {


                        loading ? '': cumpleCuarentena  ?
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
                        
                        {!cumpleCuarentena ? '' :loading ? '': <button type="button" onClick={handleClickOpen} className="btn btn-primary">Siguiente</button>}

                        {/* { hizoClickSiguiente ? <button type="button" onClick={verificarTakeScreen} className="btn btn-primary">Siguiente</button> : ''} */}
                        {loading && <Loader type="Oval" color="#00BFFF" height={30} width={30} timeout={3000}  />}  
                    </div>
                    <div className="col-lg-2">
                        {/* { hizoClickSiguiente2 ? takeScreen ? cumpleCuarentena ? <button type="submit" onClick={()=>{return true}} className="btn btn-primary">Guardar</button> : '' : '' : ''} */}
                        {!cumpleCuarentena ? '' :!confirm ? '': <button type="submit"  className="btn btn-primary">Guardar</button> } 
                    </div>
                </div>
            </form>
        </div>
    )
}
export default TemplateMonitoreo
