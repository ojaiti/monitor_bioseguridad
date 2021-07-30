import React from 'react'
import cordoba from '../../data/cordoba'
import TemplateMonitoreo from '../helpers/TemplateMonitoreo'

const MonitorCordoba = () => {
    return (
        <div>
            <TemplateMonitoreo granjas={cordoba} titulo={'Cordoba'} nombreTabla={'tablacordoba'} />
        </div>
    )
}

export default MonitorCordoba