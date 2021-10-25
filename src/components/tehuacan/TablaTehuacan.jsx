import React from 'react'
import tehuacan from '../../data/tehuacan'
import TemplateBioseguridad from '../helpers/TemplateBioseguridad'

const TablaTehuacan = () => {
    return (
        <div>
            <TemplateBioseguridad granjas={tehuacan} name={'tehuacan'}  />
        </div>
    )
}

export default TablaTehuacan
