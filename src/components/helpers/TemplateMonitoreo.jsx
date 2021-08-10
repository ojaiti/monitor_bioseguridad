import React, { useContext, useEffect, useState } from 'react'
import "../../css/mainBody.css"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';
import CuentaRegresiva from './CuentaRegresiva';

const TemplateMonitoreo = ({region, granjas, titulo, nombreTabla }) => {
    const [ciudad, setCiudad] = React.useState('1');
    const [ciudad2, setCiudad2] = React.useState('2');
    const [loading, setLoading] = React.useState(false)
    const [cumpleCuarentena, setCumpleCuarentena] = useState(false)
    const [hizoClickSiguiente, setHizoClickSiguiente] = useState(false)

    const [isLoading, setIsLoading] = useState(true)
    /* Tiempo de carga para el loader */
    const timeLoader = 1000
    const [finCuarentena, setFinCuarentena] = useState(null)
    //Se obtiene los datos del usuario actual
    const { user:{ name, user_detail }} = useContext(AuthContext);
    
    const [last_farm, setLastFarm] = useState(user_detail)

    const [farmsList, setFarmsList] = useState({})

    /* Esta funcion dispara el Loader */
    const handleLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, timeLoader)
    }

    const getFarms = (region) => {
        fetch("http://127.0.0.1:8000/farms_by_region/"+region)
        .then(function(response) {
          return response.json();
        })
        .then(function(farm_list){
            setFarmsList(farm_list)
            console.log('lista_farms', farm_list);
            setIsLoading(false)
          })
    }
    useEffect(() => {

        const farms_lsit = getFarms(region)


        setCiudad(user_detail.farm_frm_visited_id)
        handleLoading()
    }, [user_detail, region])
    /* Function para cambiar a la seccion de BIOSEGURIDAD */
    let history = useHistory();
    const handleClick = () => {
        history.push("/" + nombreTabla);
    }
    console.log('farmsListState', farmsList);
    /* Submit */
    const handleSubmit = (e) => {

        var url = 'http://127.0.0.1:8000/farm_visited';
        var data = {
            "frm_visited_date": new Date(),
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
                console.log('EEE',res)

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
            })


        });
        e.preventDefault()  
    }
    
    /* Esta funcion no realiza ninguna acccion pero is indispensable */
    /* const handleChange = (event) => {
        setCiudad(event.target.value);
        handleLoading()
    }; */
    var noches = parseInt(granjas[parseInt(ciudad) - 1].noches[parseInt(ciudad2) - 1])
    const handleChange2 = (event) => {
        setCiudad2(event.target.value);
        handleLoading()
        setHizoClickSiguiente(false)
    };
/* Cumple o no Con Cuarentena */
    const verificarCuarentena = (event) => {
        setHizoClickSiguiente(true)
        if(finCuarentena.days <= 0 && finCuarentena.hours <= 0 && finCuarentena.minutes <= 0 && finCuarentena.seconds <= 0){
            setCumpleCuarentena(true)
        }
        else{
            setCumpleCuarentena(false)
        }
    }
    return (
        <div className="main__body">
            {/* Tiempo Restante para tu proxima visita a granja */}
            <CuentaRegresiva
            fecha={last_farm.frm_visited_date}
            noches = {noches == 0 ? -1 : noches}
            setFinCuarentena={setFinCuarentena} 
            />
            
            <h2 className="text-uppercase">{titulo}</h2>
            
            
            <h1>Nota: Revisa primero las restricciones existentes de <button className="btn btn-warning" type="button" onClick={handleClick}>BIOSEGURIDAD</button></h1>

            <h1>{name}</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}} noValidate autoComplete="off">
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
                            helperText={'Ultima Granja Visitada: ' +last_farm.frm_name +' '+last_farm.frm_visited_date}

                        >
                            {granjas.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label.toUpperCase()}
                                </MenuItem>
                            ))}
                        </TextField>
                        {/* Resolver Error */}
                    </div>
                    <div className="mb-30">
                        <span>Estatus (Origen) {' '}</span>
                        <span className={granjas[parseInt(ciudad) - 1].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {granjas[parseInt(ciudad) - 1].status}
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

                            {granjas.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label.toUpperCase()}
                                </MenuItem>
                            ))}
                        </TextField>

                               
                    </div>
                    <div className="mb-10">
                        <span>Estatus (Destino) {' '}</span>
                        <span className={granjas[parseInt(ciudad2) - 1].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {granjas[parseInt(ciudad2) - 1].status}
                        </span>
                    </div>
                    
                </div>

                <div className="show__restriccion">
                    <h4 className="mb-30">Restricción Actual</h4>
                    <div style={{ textAlign: 'center' }}>

                        {
                            ciudad === ciudad2 ? 'Libre' :
                            granjas[parseInt(ciudad) - 1].destinosConAutorizacion.includes(ciudad2) ? 'No deberá asistir / requiere autorización' :
                            granjas[parseInt(ciudad) - 1].destinosConPrevencion.includes(ciudad2) && 'Podrá asistir, utilizando ropa de tránsito limpia y proporcionada por la Operación.'
                        }
                        <br /><br /><br /><br /><br />
                        {
                            loading ? '' : granjas[parseInt(ciudad) - 1].destinosConAutorizacion.includes(ciudad2) ? granjas[parseInt(ciudad) - 1].noches[parseInt(ciudad2) - 1] : ''
                        }

                        {
                            loading ? '' : granjas[parseInt(ciudad) - 1].noches[parseInt(ciudad2) - 1] === '1' ? ' noche' : ' noches'
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
                        
                        {hizoClickSiguiente ? cumpleCuarentena ?
                         <div>
                             <img className="logo-ojai" src='./assets/success.png' alt="Logo Ojai" />
                             <h6>SI CUMPLE CON CUARENTENA</h6>
                        </div> :
                         <div>
                             <img className="logo-ojai" src='./assets/danger.png' alt="Logo Ojai" />
                             <h5>NO CUMPLE CON CUARENTENA</h5>
                        </div> : ''}
                        
                    </div>

                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="col-lg-2">
                   {
                    loading ? '' : <button type="button" onClick={verificarCuarentena} className="btn btn-primary">Siguiente</button>
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
                    {hizoClickSiguiente ? cumpleCuarentena ? <button type="submit" className="btn btn-primary">Guardar</button> : '' : ''}
                    </div>
                </div>
            </form>







        </div>
    )
}
export default TemplateMonitoreo
