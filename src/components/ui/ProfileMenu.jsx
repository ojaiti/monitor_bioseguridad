import React from 'react'

const ProfileMenu = () => {

    return (
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
                            PaperProps={{
                            style: {
                                maxHeight: ITEM_HEIGHT * 4.5,
                                width: '25ch',
                            },
                            }}
                        >
          
                        <MenuItem >
                        {user_detail.nombre} {user_detail.apellidos}

                    </MenuItem>
                    <MenuItem onClick={ handleVisitas }>
                        Mis visitas
                    </MenuItem>
                    <MenuItem onClick={ handleLogout } >
                        Salir
                    </MenuItem>
                    </Menu>
                </div>
    )
}

export default ProfileMenu
