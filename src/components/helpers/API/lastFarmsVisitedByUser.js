
const lastFarmVisitedByUser = async (user_id, controller_signal) => {
    try{

        const url = `http://127.0.0.1:8000/last_farms_visited_by_user/${user_id}`
        const res = await fetch(url, {signal: controller_signal.signal})
        const farmsVisited = await res.json()
        return farmsVisited;
    } catch(error){
        if(error.name === 'AbortError') console.log('Request Abortes')
        else console.error(error)
        console.log(error)
    }
}

export default lastFarmVisitedByUser
