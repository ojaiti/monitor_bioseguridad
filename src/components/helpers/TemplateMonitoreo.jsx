import React, { useContext, useEffect, useState } from 'react'
import "../../css/mainBody.css"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';
import CuentaRegresiva from './CuentaRegresiva';

const TemplateMonitoreo = ({ granjas, titulo, nombreTabla }) => {
    const [ciudad, setCiudad] = React.useState('1');
    const [ciudad2, setCiudad2] = React.useState('2');
    const [loading, setLoading] = React.useState(false)
    const [cumpleCuarentena, setCumpleCuarentena] = useState(false)
    const [hizoClickSiguiente, setHizoClickSiguiente] = useState(false)
    /* Tiempo de carga para el loader */
    const timeLoader = 1000
    const [finCuarentena, setFinCuarentena] = useState(null)
    
    //Se obtiene los datos del usuario actual
    const { user:{ name, user_detail }} = useContext(AuthContext);

    /* Esta funcion dispara el Loader */
    const handleLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, timeLoader)
    }
    
    useEffect(() => {
        setCiudad(user_detail.farm_frm_visited_id)
        handleLoading()
        console.log('finCuarentena', finCuarentena)
    }, [])
    /* Function para cambiar a la seccion de BIOSEGURIDAD */
    let history = useHistory();
    const handleClick = () => {
        history.push("/" + nombreTabla);
    }
    /* Funcion para verificar si puedes reigistrar una visita */
    const handleSubmit = (e) => {
        console.log(finCuarentena)
        e.preventDefault()  
    }
    
    /* Esta funcion no realiza ninguna acccion pero is indispensable */
    /* const handleChange = (event) => {
        setCiudad(event.target.value);
        handleLoading()
    }; */
    const handleChange2 = (event) => {
        setCiudad2(event.target.value);
        handleLoading()
        setHizoClickSiguiente(false)
    };

    const verificarCuarentena = (event) => {
        setHizoClickSiguiente(true)
        if(finCuarentena.days === 0 && finCuarentena.hours === 0 && finCuarentena.minutes === 0 && finCuarentena.seconds === 0){
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
            fecha={user_detail.frm_visited_date}
            noches = {parseInt(granjas[parseInt(ciudad) - 1].noches[parseInt(ciudad2) - 1])}
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
                            helperText={'Ultima Granja Visitada: ' +user_detail.frm_name +' '+user_detail.frm_visited_date}

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
                            loading ? '' : granjas[parseInt(ciudad) - 1].destinosConAutorizacion.includes(ciudad2) ? granjas[parseInt(ciudad) - 1].noches[parseInt(ciudad2) - 1] : 'aaaaaaaaaaa'
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
                        {hizoClickSiguiente ? cumpleCuarentena ? <h5>SI CUMPLE CON CUARENTENA</h5> : <h5>NO CUMPLE CON CUARENTENA</h5> : ''}
                        
                    </div>

                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                    <div className="col-lg-2">
                   {
                    loading ? '' : <button onClick={verificarCuarentena} className="btn btn-primary">Siguiente</button>
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
                    {hizoClickSiguiente ? cumpleCuarentena ? <button className="btn btn-primary">Guardar</button> : '' : ''}
                    </div>
                </div>
            </form>







        </div>
    )
}
export default TemplateMonitoreo
