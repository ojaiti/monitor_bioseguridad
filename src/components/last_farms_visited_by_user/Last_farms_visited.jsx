import React, { useContext } from 'react'
import axios from 'axios';
import { AuthContext } from '../../auth/AuthContext';

const Last_farms_visited = () => {
    const { user:{ name, user_detail } } = useContext(AuthContext);
    const [post, setPost] = React.useState(null);
    const baseURL = "http://127.0.0.1:8000/last_farms_visited_by_user/" + user_detail.id;

    console.log(baseURL)
    React.useEffect(() => {
        console.log('fARMS_VISITED',user_detail.id)
        axios.get(baseURL).then((response) => {
            console.log(response)
          setPost(response.data);
        });
      }, [user_detail.id]);
    
      if (!post) return null;
      post.map((response) => {
          console.log(response.Farm.frm_name)
      })

    return (
        <div className="container mt-5">
            <h4>Ultimas Visitas</h4>
        <table class="table">
        <thead>
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Granja</th>
            <th scope="col">Fecha</th>
            </tr>
        </thead>
        <tbody>
    
            {
                post.map((response) => {
                    return(
                        <tr>
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
