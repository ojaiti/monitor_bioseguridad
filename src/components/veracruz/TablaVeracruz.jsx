import React from 'react'
import veracruz from '../../data/veracruz'
import TemplateBioseguridad from '../helpers/TemplateBioseguridad'

const TablaVeracruz = () => {
    return (
        <div>
            <TemplateBioseguridad granjas={veracruz} cantidadDeColumnasYFilas={19}  />
        </div>
    )
}

export default TablaVeracruz
