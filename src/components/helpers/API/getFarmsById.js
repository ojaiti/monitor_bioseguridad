
const getFarmsByRegion = async (region_id) => {
    const url = `${process.env.REACT_APP_API_PRODUCTION}farms_by_region/${region_id}`
    const res = await fetch(url)
    const farmsByRegion = await res.json()
    return farmsByRegion;
}

export default getFarmsByRegion
