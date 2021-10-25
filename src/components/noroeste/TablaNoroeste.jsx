import React from 'react'
import noroeste from '../../data/noroeste'
import TemplateBioseguridad from '../helpers/TemplateBioseguridad'

const TablaNoroeste = () => {
    return (
        <div>
            <TemplateBioseguridad granjas={noroeste} name={'noroeste'} />
        </div>
    )
}

export default TablaNoroeste
