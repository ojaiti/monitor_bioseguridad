import React from 'react'
import cordoba from '../../data/cordoba'
import TemplateBioseguridad from '../helpers/TemplateBioseguridad'

const TablaCordoba = () => {
    return (
        <div>
            <TemplateBioseguridad granjas={cordoba} name={'cordoba'} />
        </div>
    )
}

export default TablaCordoba
