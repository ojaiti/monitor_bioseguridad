import React from 'react'
import tehuacan from '../../data/tehuacan'
import TemplateBioseguridad from '../helpers/TemplateBioseguridad'

const TablaTehuacan = () => {
    return (
        <div>
            <TemplateBioseguridad granjas={tehuacan} cantidadDeColumnasYFilas={16}  />
        </div>
    )
}

export default TablaTehuacan
