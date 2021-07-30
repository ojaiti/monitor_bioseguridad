import React from 'react'
import tehuacan from '../../data/tehuacan'
import TemplateBioseguridad from '../helpers/TemplateBioseguridad'

const TablaTehuacan = () => {
    return (
        <div>
            <TemplateBioseguridad granjas={tehuacan} cantidadDeColumnasYFilas={14}  />
        </div>
    )
}

export default TablaTehuacan
