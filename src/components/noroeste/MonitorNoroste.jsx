import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import noroeste from '../../data/noroeste'
import getFarmsByRegion from '../helpers/API/getFarmsById'
import lastOneFarmVisitedByUser from '../helpers/API/lastOneFarmVisitedByUser'
import TemplateMonitoreo from '../helpers/TemplateMonitoreo'


const MonitorNoroeste = () => {
    const [farms, setFarms] = useState(null)
    const [farmVisitedByUser, setfarmVisitedByUser] = useState(null)
    const { user:{ user_detail }} = useContext(AuthContext);

     useEffect(() => {
        farmsByRegion(1)
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
            console.log('data adsad', data[0])
            setfarmVisitedByUser({
                farm_id: data[0].Farm.frm_id,
                farm_name: data[0].Farm.frm_name,
                farm_date: data[0].FarmsVisited.frm_visited_date
            })
        })
    }
    
    if (!farms) return null;
    if (!farmVisitedByUser) return null;
    return (
        <div>
            <TemplateMonitoreo region={1} farms={farms} lastFarmVisited = {farmVisitedByUser} granjas={noroeste} titulo={'Noroeste'} nombreTabla={'tablanoroeste'} />
        </div>
    )
}

export default MonitorNoroeste
