const getLastRegionVisitedByUser = async (user_id) => {
    const url = `http://127.0.0.1:8000/last_region_visited_by_user/${user_id}`
    const res = await fetch(url)
    const farmVisited = await res.json()
    return farmVisited;
}

export default getLastRegionVisitedByUser
