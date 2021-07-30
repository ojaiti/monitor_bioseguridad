import React from 'react'
import "../../css/mainBody.css"
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
import noroeste from '../../data/noroeste'
const Todas_regiones = () => {
    const granjas  = [
        {
          value: '1',
          label: 'Noroeste',
          status: 'No libre',
          destinosConAutorizacion:['1', '2', '3','4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14','15','16','17','18','19','20', '21','22', '23', '24', '25', '27', '28', '29','30','31' , '32', '33', '34', '35', '36', '37'],
          destinosConPrevencion: ['14', '15', '17', '26', '38'],
          noches: ['-','3','3','3','3','0','0','0','0','0','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','2','3','3','3','0','0','0','0','0']
        },
        {
          value: '2',
          label: 'Veracruz',
          status: 'No libre',
          destinosConAutorizacion:['1', '2', '3','4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14','15','16','17','18','19','20', '21','22', '23', '24', '25', '27', '28', '29','30','31' , '32', '33', '34', '35', '36', '37'],
          destinosConPrevencion: [  '1', '3','4', '5'],
          noches: ['3','-','3','3','3','2','2','2','2','2','0','0','2','2','2','2','2','2','2','2','2','2','2','2','2','2','0','0','0','0','3','3','0','0','0','0','0']
        
        },
        {
          value: '3',
          label: 'Tehuacan',
          status: 'No libre',
          destinosConAutorizacion:['1', '2', '3','4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14','15','16','17','18','19','20', '21','22', '23', '24', '25', '27', '28', '29','30','31' , '32', '33', '34', '35', '36', '37'],
          destinosConPrevencion: [  '1', '3','4', '5'],
          noches: ['3','-','3','3','3','2','2','2','2','2','0','0','2','2','2','2','2','2','2','2','2','2','2','2','2','2','0','0','0','0','3','3','0','0','0','0','0']
        
        },
        {
          value: '4',
          label: 'Cordoba',
          status: 'No libre',
          destinosConAutorizacion:['1', '2', '3','4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14','15','16','17','18','19','20', '21','22', '23', '24', '25', '27', '28', '29','30','31' , '32', '33', '34', '35', '36', '37'],
          destinosConPrevencion: [  '1', '3','4', '5'],
          noches: ['3','-','3','3','3','2','2','2','2','2','0','0','2','2','2','2','2','2','2','2','2','2','2','2','2','2','0','0','0','0','3','3','0','0','0','0','0']
        }]

    const [ciudad, setCiudad] = React.useState('1');
    const [ciudad2, setCiudad2] = React.useState('2');
    const [loading, setLoading] = React.useState(false)
    const timeLoader = 1000
    let history = useHistory();
    const handleClick = () => {
        console.log('Gokla')
        /* history.push("/" + nombreTabla); */
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
    /* Select Origen */
    const handleChange = (event) => {
        setCiudad(event.target.value);
        handleLoading()
    };
    /* Select Destino */
    const handleChange2 = (event) => {
        setCiudad2(event.target.value);

        console.log('ciudad', ciudad)
        console.log('ciudad2', ciudad2)
        handleLoading()
    };

    return (
        <div className="main__body">
            <h2>Todas Las Regiones</h2>
            
            
            <h1>Nota: Revisa primero las restricciones existentes de <button className="btn btn-warning" type="button" onClick={handleClick}>BIOSEGURIDAD</button></h1>

            
            <form onSubmit={(e)=>{handleSubmit(e)}} noValidate autoComplete="off">
                <div className="content-form d-flex" >
                    <div className="group_select mb-2">
                        <div className="mb-10">
                            
                            <h4>Origen</h4>

                            <TextField
                                disabled
                                id="standard-select-currency"
                                select
                                label="Select"
                                value={ciudad}
                                onChange={handleChange}
                                helperText="Ultima Granja Visitada"
                            >
                                {granjas.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <div className="mb-30">
                            <span>Estatus (Origen) {' '}</span>
                            <span className={granjas[parseInt(ciudad) - 1].status === 'Libre' ? 'libre' : 'noLibre'}>
                                {
                                    granjas[parseInt(ciudad) - 1].status
                                }

                            </span>
                        </div>

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
                        <div className="mb-10">
                        <span>Estatus (Destino) {' '}</span>
                        <span className={granjas[parseInt(ciudad2) - 1].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {
                                granjas[parseInt(ciudad2) - 1].status
                            }

                        </span>
                    </div>
                               
                    </div>
                    
                    </div>

                    {/* Segundo select es condicional */}
                    <div className="group_select">
                        <div className="mb-10">
                            
                            <h4>Origen</h4>

                            <TextField
                                disabled
                                id="standard-select-currency"
                                select
                                label="Select"
                                value={ciudad}
                                onChange={handleChange}
                                helperText="Ultima Granja Visitada"
                            >
                                {granjas.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label.toUpperCase()}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <div className="mb-30">
                            <span>Estatus (Origen) {' '}</span>
                            <span className={granjas[parseInt(ciudad) - 1].status === 'Libre' ? 'libre' : 'noLibre'}>
                                {
                                    granjas[parseInt(ciudad) - 1].status
                                }

                            </span>
                        </div>

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
                        <div className="mb-10">
                        <span>Estatus (Destino) {' '}</span>
                        <span className={granjas[parseInt(ciudad2) - 1].status === 'Libre' ? 'libre' : 'noLibre'}>
                            {
                                granjas[parseInt(ciudad2) - 1].status
                            }

                        </span>
                    </div>
                               
                    </div>
                    
                    </div>
                </div>

                <div className="show__restriccion">
                    <h4 className="mb-30">Restricción Actual</h4>
                    <div style={{ textAlign: 'center' }}>

                        {
                            ciudad === ciudad2 ? 'Revise flujos intra operación' :
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

                    </div>

                </div>
                <div className="col-lg-12 d-flex justify-content-center">
                    <button className="btn btn-primary">Visitar</button>
                </div>
            </form>







        </div>
    )
}
export default Todas_regiones
