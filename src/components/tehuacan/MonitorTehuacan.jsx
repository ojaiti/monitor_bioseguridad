import React, { useEffect, useState } from 'react'
import getFarmsByRegion from '../helpers/API/getFarmsById'
import tehuacan from '../../data/tehuacan'
import TemplateMonitoreo from '../helpers/TemplateMonitoreo'

const MonitorTehuacan = () => {
    const [farms, setFarms] = useState(null)
     useEffect(() => {
        farmsByRegion(3)
    },[])
    const farmsByRegion = (region) => {
        getFarmsByRegion(region)
        .then((data)=>{
            setFarms(data)
        })
    }
    if (!farms) return null;
    return (
        <div>
            <TemplateMonitoreo region={3} farms={farms} granjas={tehuacan} titulo={'Tehuacan'} nombreTabla={'tablatehuacan'} />
        </div>
    )
}

export default MonitorTehuacan
