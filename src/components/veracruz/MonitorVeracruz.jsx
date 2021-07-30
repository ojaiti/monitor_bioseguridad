import React from 'react'
import veracruz from '../../data/veracruz'
import TemplateMonitoreo from '../helpers/TemplateMonitoreo'

const MonitorVeracruz = () => {
    return (
        <div>
            <TemplateMonitoreo granjas={veracruz} titulo={'Veracruz'} nombreTabla={'tablaveracruz'} />
        </div>
    )
}

export default MonitorVeracruz
