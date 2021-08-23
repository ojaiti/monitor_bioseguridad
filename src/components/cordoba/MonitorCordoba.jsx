import React, { useEffect, useState } from 'react'
import getFarmsByRegion from '../helpers/API/getFarmsById'
import cordoba from '../../data/cordoba'
import TemplateMonitoreo from '../helpers/TemplateMonitoreo'

const MonitorCordoba = () => {
    const [farms, setFarms] = useState(null)
     useEffect(() => {
        farmsByRegion(4)
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
            <TemplateMonitoreo region={4} farms={farms} granjas={cordoba} titulo={'Cordoba'} nombreTabla={'tablacordoba'} />
        </div>
    )
}

export default MonitorCordoba