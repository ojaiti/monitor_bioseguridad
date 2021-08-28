import React, { useContext, useEffect, useState } from 'react'
import getFarmsByRegion from '../helpers/API/getFarmsById'
import veracruz from '../../data/veracruz'
import TemplateMonitoreo from '../helpers/TemplateMonitoreo'
import lastOneFarmVisitedByUser from '../helpers/API/lastOneFarmVisitedByUser'
import { AuthContext } from '../../auth/AuthContext'

const MonitorVeracruz = () => {
    const [farms, setFarms] = useState(null)
    const [farmId, setFarmId]  = useState(1)
    const [farmVisitedByUser, setfarmVisitedByUser] = useState(null)
    const [nochesFarmId, setNochesFarmId] = useState(null)
    const { user:{ user_detail }} = useContext(AuthContext);


     useEffect(() => {
        farmsByRegion(2)
        lastOneFarmByUser(user_detail.id)

    },[user_detail.id])
    const farmsByRegion = (region) => {
        var extract = [] /* Array para cambiar el id de las granjas por el frm_id */
        var nochesWithFarmId = [] /* Array para cambiar el indice y comparar con noches y dias autorizados */
        getFarmsByRegion(region)
        .then((data)=>{
            const initialFrmId = data[0].frm_id
           
            /* ID DE LA ULTIMA GRANJA */
            const endFrmId = data.length + initialFrmId - 1
            /* Si se borra un id de alguna granja el programa podria caerse */
            setFarmId(data[0].frm_id)
            console.log('restriction', data[0].frm_restriction)
            /* Agreamos la clave de la granja como indice al array de granjas */
            var count = 0;
            data.map((farm, index) => {
               extract[farm.frm_id] = farm
               nochesWithFarmId[farm.frm_id] = count
               count++;
            })
            setNochesFarmId(nochesWithFarmId)
            setFarms(extract)
            count = 0
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
            <TemplateMonitoreo region={2} farms={farms} nochesFarmId={nochesFarmId} lastFarmVisited = {farmVisitedByUser} farmId ={ farmId} granjas={veracruz} titulo={'Veracruz'} nombreTabla={'tablaveracruz'} />
        </div>
    )
}

export default MonitorVeracruz


