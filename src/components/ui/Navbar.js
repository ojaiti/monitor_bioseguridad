import React, { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';
import '../../css/header.css'
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MenuIcon from '@material-ui/icons/Menu';
export const Navbar = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isOpen, setIsOpen] = React.useState(true);
    const [openCloseClass, setOpenCloseClass] = React.useState('navbar navbar-expand-sm navbar-dark');
    const open = Boolean(anchorEl);
    const ITEM_HEIGHT = 48;


    const {user:{ name }, dispatch } = useContext(AuthContext);
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
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleVisitas = () => {
        history.push("/");
    }   

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleCloseOpenNav = () => {
        setIsOpen(!isOpen)

        !isOpen ? setOpenCloseClass('navbar navbar-expand-sm navbar-dark') : setOpenCloseClass('navbar navbar-expand-sm navbar-dark open__close__nav')
        
    }
    /* console.log('Famrs_List', user_detail) */
    /* const farms_list = user_detail.visible_farms[0].visible_farms */
    return (
        <nav className={openCloseClass}>

    
            <Link 
                className="navbar-brand" 
                to="/"
            >
                 Monitor de Visitas
            </Link>
            <span onClick={handleCloseOpenNav} className="open__close__icon"><MenuIcon /> </span>

    
            <div className="navbar-collapse col-lg-7">

                <div className="navbar-nav">
               {/*  {farms_list.map((farm, index)=>{
                        const farm_link = `/${farm}`
                        return <NavLink 
                                key={index}
                                activeClassName="active"
                                className="nav-item nav-link" 
                                exact
                                to={farm_link}
                            >
                                {farm.toUpperCase()}
                            </NavLink>
                    })} */}
                   {/*  <NavLink 
                                
                                activeClassName="active"
                                className="nav-item nav-link" 
                                exact
                                to='/'
                            >
                                Noroeste
                            </NavLink> */}
                    <NavLink 
                                
                                activeClassName="active"
                                className="nav-item nav-link" 
                                exact
                                to='/bienvenida'
                            >
                                Bienvenida
                            </NavLink>
    
                  
                    {/* ------------------------------------------------ */}
                   
                    <NavLink 
                        activeClassName="active"
                        className="nav-item nav-link" 
                        exact
                        to="/acciones_preventivas"
                    >
                        ACCIONES  PREVENTIVAS
                    </NavLink>

                    
                </div>
            </div>

            <div className="navbar-collapse w-100 order-3 dual-collapse2">
            
                <ul className="navbar-nav ml-auto">

                    <span className="nav-item nav-link text-warning"> 
                        { name }
                    </span>

                    

                    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '25ch',
          },
        }}
      >
          
          
          <MenuItem onClick={ handleVisitas }>
            Mis visitas
          </MenuItem>
          <MenuItem onClick={ handleLogout } >
            Salir
          </MenuItem>
      </Menu>
    </div>
                </ul>
            </div>
        </nav>
    )
}