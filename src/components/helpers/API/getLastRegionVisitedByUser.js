const getLastRegionVisitedByUser = async (user_id) => {
    const url = `${process.env.REACT_APP_API_PRODUCTION}last_region_visited_by_user/${user_id}`
    const res = await fetch(url)
    const farmVisited = await res.json()
    return farmVisited;
}

export default getLastRegionVisitedByUser
