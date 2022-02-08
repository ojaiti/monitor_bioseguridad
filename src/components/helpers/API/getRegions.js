const getFarmsByRegion = async (region_id) => {
    const url = `${process.env.REACT_APP_API_TEST}farms/`
    const res = await fetch(url)
    const farmsByRegion = await res.json()
    return farmsByRegion;
}
export default getFarmsByRegion
