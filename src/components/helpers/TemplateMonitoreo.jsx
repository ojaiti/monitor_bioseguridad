import React, { useContext, useEffect, useState } from 'react'
import "../../css/mainBody.css"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../../auth/AuthContext';

const TemplateMonitoreo = ({ granjas, titulo, nombreTabla }) => {

    const [lastFarmVisited, setLastFarmVisited] = useState({})
    
    //Se obtiene los datos de la ultima granja visitada por usuario
    const { user:{ name, user_detail }, dispatch } = useContext(AuthContext);



 useEffect(() => {
    const fetchData = async () => {
    const lastFarm = await fetch(`http://127.0.0.1:8000/last_farm_visited_by_user/${user_detail.id}`, {
        /* Aqui se obtiene la request a la info del usuario */
        method: "GET"
      })
    const lastFarmResponse = await lastFarm.json()
      console.log(lastFarmResponse)
    const lastFarmName = await fetch(`http://127.0.0.1:8000/farms/${lastFarmResponse.farm_frm_visited_id}`, {
        /* Aqui se obtiene la request a la info del usuario */
        method: "GET"
      })
      const lastFarmResponseName = await lastFarmName.json()
      

      const data= {
        'visita_fecha':lastFarmResponse.frm_visited_date.slice(0, 10),
        'nombre_granja':lastFarmResponseName.frm_name,
        'id_granja' : lastFarmResponse.farm_frm_visited_id
      }

      setLastFarmVisited(data)
    }
    fetchData()
 }, [user_detail.id])




 console.log('lastFarmVisited',lastFarmVisited)
 
    const [ciudad, setCiudad] = React.useState('1');
    const [ciudad2, setCiudad2] = React.useState('2');
    const [loading, setLoading] = React.useState(false)
    /* Tiempo de carga para el loader */
    const timeLoader = 1000

    let history = useHistory();
    const handleClick = () => {
        history.push("/" + nombreTabla);
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Hello')
        setCiudad(ciudad2)
    }
    const handleLoading = () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, timeLoader)
    }
    const handleChange = (event) => {
        setCiudad(event.target.value);
        handleLoading()
    };
    const handleChange2 = (event) => {
        setCiudad2(event.target.value);

        console.log('ciudad', ciudad)
        console.log('ciudad2', ciudad2)
        handleLoading()
    };

    return (
        <div className="main__body">
            <h2 className="text-uppercase">{titulo}</h2>
            
            
            <h1>Nota: Revisa primero las restricciones existentes de <button className="btn btn-warning" type="button" onClick={handleClick}>BIOSEGURIDAD</button></h1>
            
            <h4>Origen</h4>
            <h1>{name}</h1>
            <h1>{lastFarmVisited.nombre_granja}</h1>
            <h1>{lastFarmVisited.visita_fecha}</h1>
            <div className="mb-30">
                        <span>Estatus (Origen) {' '}</span>
                        <span className={granjas[parseInt(ciudad) - 1].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {
                                granjas[parseInt(ciudad) - 1].status
                            }

                        </span>
                    </div>
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
                            onChange={handleChange}
                            /* Show Date of your last visit */
                            helperText={lastFarmVisited && 'Ultima Granja Visitada: ' +lastFarmVisited.nombre_granja +' '+lastFarmVisited.visita_fecha}

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
                            {
                                granjas[parseInt(ciudad) - 1].status
                            }

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
                            {
                                granjas[parseInt(ciudad2) - 1].status
                            }

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
                        <h2>No se puede ir</h2>
                    </div>

                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                    <button className="btn btn-primary">Siguiente</button>
                </div>
            </form>







        </div>
    )
}
export default TemplateMonitoreo
