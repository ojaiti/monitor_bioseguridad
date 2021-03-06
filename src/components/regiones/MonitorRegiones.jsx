import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import getFarmsByRegion from '../helpers/API/getFarmsById'
import lastOneFarmVisitedByUser from '../helpers/API/lastOneFarmVisitedByUser'
import Regresiva from '../helpers/Regresiva';
import regiones from '../../data/regiones'
import { MenuItem, TextField } from '@material-ui/core'
import { useHistory } from 'react-router'
import Loader from 'react-loader-spinner';

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

const MonitorRegion = () => {


    const [ciudad, setCiudad] = React.useState('1');
    const [ciudad2, setCiudad2] = React.useState('1');
    const [ciudad3, setCiudad3] = React.useState('1');
    const [farms, setFarms] = useState(null)
    const [loading, setLoading] = React.useState(true)
    const [farmVisitedByUser, setfarmVisitedByUser] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);

  
    const timeLoader = 1000
    const { user:{ user_detail }} = useContext(AuthContext);
    const titulo = 'Regiones';
    const nombreTabla = 'tablaregiones'

    /* function de cargar */
    const handleLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, timeLoader)
    }

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

     useEffect(() => {

        farmsByRegion(parseInt(ciudad2))
        lastOneFarmByUser(user_detail.id)
        handleLoading()
    },[ciudad2, user_detail.id])

    const farmsByRegion = (region) => {
        var extract = [] /* Array para cambiar el id de las granjas por el frm_id */
        var nochesWithFarmId = [] /* Array para cambiar el indice y comparar con noches y dias autorizados */
        getFarmsByRegion(region)
        .then((data)=>{
            /* Si se borra un id de alguna granja el programa podria caerse */
            console.log('restriction', data)
            /* Agreamos la clave de la granja como indice al array de granjas */
            var count = 0;
            data.map(farm => {
               extract[farm.frm_id] = farm
               nochesWithFarmId[farm.frm_id] = count
               count++;
               return 1
            })

            
            setCiudad3(data[0].frm_id)
            setFarms(extract)
            
            count = 0
        })
    }

    console.log('Hello')
   /*  const verificarCuarentena = (event) => {
        setHizoClickSiguiente(true)
        alert('Work')
    } */

    const lastOneFarmByUser = (user_id) => {
        lastOneFarmVisitedByUser(user_id)
        .then((data) => {
            setCiudad(data[0].Farm.region_frm_id)
            console.log('Farm_lastvisited_Regions', data)
            setfarmVisitedByUser({
                "farm_frm_visited_id": data[0].Farm.frm_id,
                "frm_visited_name": data[0].Farm.frm_name,
                "frm_visited_date": data[0].FarmsVisited.frm_visited_date,
                "quarentine_nights": data[0].FarmsVisited.frm_visited_quarantine_nights,
                "is_region": data[0].FarmsVisited.frm_visited_is_region

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

    function sumarDias(fecha, dias){
        fecha.setDate(fecha.getDate() + dias);
        return fecha;
      } 
/* Validar las noches para ver si puede o no pasar */
    const handleSubmit = (e) => {
        var nochesCount = regiones[ciudad -1].noches[parseInt(ciudad2) - 1] === '-' ? '0' : regiones[ciudad -1].noches[parseInt(ciudad2) - 1]
        /* Obtenemos la fecha actual */
        const dateNow = new Date()
        /* Obtenemos la fecha de la ultima granja visitada por usuario */
        const dateFinal = new Date(farmVisitedByUser.frm_visited_date)
        /* Agregagmos las nocghes correspondientes a la fecha de la ultima granja visitada */
        const dateWithNights = sumarDias(dateFinal, parseInt(nochesCount));
        
        
        if(dateWithNights.getTime() < dateNow.getTime()){
            nochesCount = 0;
            console.log('Noches Regiones: ', nochesCount)
            var url = `${process.env.REACT_APP_API_PRODUCTION}farm_visited/`;
            var data = {
                "frm_visited_date": new Date(),
                "frm_visited_quarantine_nights":nochesCount,
                "farm_frm_visited_id": ciudad3,
                "user_frm_visited_id": user_detail.id,
                "frm_visited_is_region": 0
            };
        }

        console.log("Noches Count: ", nochesCount)
        fetch(url, {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers:{
            'Content-Type': 'application/json'
        }
        }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            setCiudad(ciudad2)
            console.log('res: 1', response)
            fetch(`${process.env.REACT_APP_API_PRODUCTION}details_visited/`+response.user_frm_visited_id)
            .then(function(response) {
                return response.json();
            })
            .then(function(res){
                console.log('resp_ regiones: ',res)
                const user_detail2 = {
                    farm_frm_visited_id : res.FarmsVisited.frm_visited_id,
                    frm_name : res.Farm.frm_name,
                    frm_visited_date : res.FarmsVisited.frm_visited_date,
                    id : res.User.id,
                    username : res.User.username,
                    quarentine_nights: res.FarmsVisited.frm_visited_quarantine_nights,
                    is_region: res.FarmsVisited.frm_visited_is_region
                }
                setfarmVisitedByUser(user_detail2)
            })
        });
        e.preventDefault()
      
    }
    const handleChange2 = (event) => {
        setCiudad2(event.target.value);
    };
    const handleChange3 = (event) => {
        setCiudad3(event.target.value);
    };

    if (!farms) return null;
    if (!farmVisitedByUser) return null;

    console.log("User_detail", farmVisitedByUser)
    return (
        
        <div className="main__body">

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
              Una vez que des click en aceptar aparecer?? el bot??n de guardar y si das click no habra marcha atras hasta que termine la cuarentea.
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
                            helperText={'Ultima visita: ' +farmVisitedByUser.frm_visited_name +' '+farmVisitedByUser.frm_visited_date}
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
                        <span className={regiones[parseInt(ciudad) -1].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {regiones[parseInt(ciudad) - 1].status}
                        </span>
                    </div>
                    <div className="mb-10">
                        <h4>Destino</h4>

                        <TextField
                            disabled={farmVisitedByUser.is_region === 1 ? true:false}
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
                        <span className={regiones[parseInt(ciudad2) - 1].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {regiones[parseInt(ciudad2) - 1].status}
                        </span>
                    </div>
                </div>

                <div className="mb-10">
                        <h4>Destino</h4>

                        <TextField
                            disabled={farmVisitedByUser.is_region === 1 ? true:false}
                            id="standard-select-currency2"
                            select
                            label="Select"
                            value={ciudad3}
                            onChange={handleChange3}
                            helperText="Porfavor selecciona el destino"
                        >

                            {farms.map((farm) => (
                                <MenuItem key={farm.frm_id} value={farm.frm_id}>
                                    {farm.frm_name.toUpperCase()}
                                </MenuItem>
                            ))}
                        </TextField>
                        <div className="mb-10">
                        <span>Estatus (Destino) {' '}</span>

                        <span className={farms[ciudad3]?.frm_restriction[0].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {farms[ciudad3]?.frm_restriction[0].status}
                        </span>
                    </div>
                    </div>

                <div className="show__restriccion">
                   
                    <p className="text-danger h4">{confirm? 'Tomar Captura': ''}</p>
                    <h4 className="mb-30">Restricci??n Actual</h4>
                    <div style={{ textAlign: 'center' }}>
                        <br /><br />
                        { loading ? '' : regiones[ciudad -1].noches[parseInt(ciudad2) - 1] === '-' ? 0 : regiones[ciudad -1].noches[parseInt(ciudad2) - 1]}
                        { loading ? '' : regiones[ciudad -1].noches[parseInt(ciudad2) - 1] === 1 ? ' noche' : ' noches'}
                        { loading && <Loader type="Oval" color="#00BFFF" height={30} width={30} timeout={timeLoader} /> }
                        
                        {farmVisitedByUser.is_region === 0 ?
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
                        
                        {farmVisitedByUser.is_region === 1 ? '': loading ? '' :<button type="button" onClick={handleClickOpen} className="btn btn-primary">Siguiente</button>}

                        {/* { hizoClickSiguiente ? <button type="button" onClick={verificarTakeScreen} className="btn btn-primary">Siguiente</button> : ''} */}
                        {loading && <Loader type="Oval" color="#00BFFF" height={30} width={30} timeout={3000}  />}  
                    </div>
                    <div className="col-lg-2">
                        {/* { hizoClickSiguiente2 ? takeScreen ? cumpleCuarentena ? <button type="submit" onClick={()=>{return true}} className="btn btn-primary">Guardar</button> : '' : '' : ''} */}
                        { confirm && <button type="submit"  className="btn btn-primary">Guardar</button> } 
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MonitorRegion
