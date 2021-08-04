import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import '../../css/header.css'
export const Navbar = () => {

    const { user:{ name }, dispatch } = useContext(AuthContext);
    const history = useHistory();
    const handleLogout = () => {

        history.replace('/login');

        dispatch({
            type: types.logout,
            payload:{
                name:'',
                token:'',
                userDetail: ''
              }
        });
    }

    
    return (
        <nav className="navbar navbar-expand-sm navbar-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                 Monitor de Visitas
            </Link>

            <div className="navbar-collapse col-lg-7">
                <div className="navbar-nav">

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/noroeste"
                    >
                        Noroeste
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/veracruz"
                    >
                        Veracruz
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/tehuacan"
                    >
                        Tehuacan
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/cordoba"
                    >
                        Cordoba
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/todas_regiones"
                    >
                        Todas las Regiones
                    </NavLink>
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/acciones_preventivas"
                    >
                        Acciones Preventivas
                    </NavLink>
                        
                    {/* <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/search"
                    >
                        Search
                    </NavLink> */}
                </div>
            </div>

            <div className="navbar-collapse w-100 order-3 dual-collapse2">
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-warning"> 
                        { name }
                    </span>

                    <button 
                        className="nav-item nav-link btn"
                        onClick={ handleLogout }
                    > 
                        Salir
                    </button>
                </ul>
            </div>
        </nav>
    )
}