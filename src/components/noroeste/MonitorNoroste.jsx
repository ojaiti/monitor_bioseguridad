import React from 'react'
import noroeste from '../../data/noroeste'
import TemplateMonitoreo from '../helpers/TemplateMonitoreo'


const MonitorNoroeste = () => {
    return (
        <div>
            <TemplateMonitoreo region={1} granjas={noroeste} titulo={'Noroeste'} nombreTabla={'tablanoroeste'} />
        </div>
    )
}

export default MonitorNoroeste
