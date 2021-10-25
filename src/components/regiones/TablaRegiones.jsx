import React from 'react'
import TemplateBioseguridad from '../helpers/TemplateBioseguridad'
import regiones from '../../data/regiones'

const TablaRegiones = () => {
    return (
        <div>
             <div>
            <TemplateBioseguridad granjas={regiones} name={'regiones'} />
        </div>
        </div>
    )
}

export default TablaRegiones
