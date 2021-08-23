import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';
import lastFarmsVisitedByUser from '../helpers/API/lastFarmsVisitedByUser';


const Last_farms_visited = () => {
    const { user:{user_detail } } = useContext(AuthContext);
    const [farms, setFarms] = React.useState(null);
    
    React.useEffect(() => {
        const controller_signal = new AbortController();
        farmsVisited(user_detail.id, controller_signal)
        return () => controller_signal.abort()
        
      }, []);

      const farmsVisited = (user_id, controller_signal) => {
        
        lastFarmsVisitedByUser(user_id, controller_signal)
        .then((data) => {
            setFarms(data)
        })
      }

      
      if (!farms) return null;

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
                farms.map((response, value) => {
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
