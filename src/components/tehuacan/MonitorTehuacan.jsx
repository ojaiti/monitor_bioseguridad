import React from 'react'
import tehuacan from '../../data/tehuacan'
import TemplateMonitoreo from '../helpers/TemplateMonitoreo'

const MonitorTehuacan = () => {
    return (
        <div>
            <TemplateMonitoreo granjas={tehuacan} titulo={'Tehuacan'} nombreTabla={'tablatehuacan'} />
        </div>
    )
}

export default MonitorTehuacan
