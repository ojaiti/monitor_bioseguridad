import React, { useContext, useEffect, useState } from 'react'
import getFarmsByRegion from '../helpers/API/getFarmsById'
import veracruz from '../../data/veracruz'
import TemplateMonitoreo from '../helpers/TemplateMonitoreo'
import lastOneFarmVisitedByUser from '../helpers/API/lastOneFarmVisitedByUser'
import { AuthContext } from '../../auth/AuthContext'

const MonitorVeracruz = () => {
    const [farms, setFarms] = useState(null)
    const [farmVisitedByUser, setfarmVisitedByUser] = useState(null)
    const { user:{ user_detail }} = useContext(AuthContext);


     useEffect(() => {
        farmsByRegion(2)
        lastOneFarmByUser(user_detail.id)

    },[])
    const farmsByRegion = (region) => {
        getFarmsByRegion(region)
        .then((data)=>{
            setFarms(data)
        })
    }

    const lastOneFarmByUser = (user_id) => {
        lastOneFarmVisitedByUser(user_id)
        .then((data) => {
            console.log('data', data[0].Farm.frm_id)
            setfarmVisitedByUser(data)
        })
    }

    if (!farms) return null;
    return (
        <div>
            <TemplateMonitoreo region={2} farms={farms} lastFarmVisitedId = {farmVisitedByUser[0].Farm.frm_id} granjas={veracruz} titulo={'Veracruz'} nombreTabla={'tablaveracruz'} />
        </div>
    )
}

export default MonitorVeracruz
