
const getFarmsByRegion = async (region_id) => {
    const url = `http://127.0.0.1:8000/farms_by_region/${region_id}`
    const res = await fetch(url)
    const farmsByRegion = await res.json()

    return farmsByRegion;
}

export default getFarmsByRegion
