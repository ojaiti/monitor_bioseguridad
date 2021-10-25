import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext';
import { useFecth } from '../../hooks/useFetch';


const Last_farms_visited = () => {
    const { user:{user_detail } } = useContext(AuthContext);

    const {data, loading} = useFecth(`${process.env.REACT_APP_API_PRODUCTION}last_farms_visited_by_user/${user_detail.id}`)
    console.log('Data', data)
    console.log('Loading', loading)

    
    if(loading) {
        return 'Loading ...'
    }

    return (
        <div className="container mt-5">
            <h4>Ultimas Visitas</h4>
        <table className="table">
        <thead>
            <tr>

            <th scope="col">No.</th>
            <th scope="col">Nombre</th>
            <th scope="col">Granja</th>
            <th scope="col">Fecha</th>
            </tr>
        </thead>
        <tbody>

    
            {
                data.map((response, value) => {
                    return(
                        <tr key={value}>
                            <td>{value +1}</td>
                            <td>{response.User.username}</td>
                            <td>{response.Farm.frm_name}</td>
                            <td>{response.FarmsVisited.frm_visited_date}</td>
                        </tr>
                    )
                })
            }
      
   
  </tbody>
</table>
        </div>
    )
}


export default Last_farms_visited
