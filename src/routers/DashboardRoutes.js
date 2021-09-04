import React, { useContext } from 'react';
import { Navbar } from '../components/ui/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom';
/* 
import { MarvelScreen } from '../components/marvel/MarvelScreen';
import { HeroScreen } from '../components/heroes/HeroScreen';
import { DcScreen } from '../components/dc/DcScreen';
import { SearchScreen } from '../components/search/SearchScreen'; */
import MonitorNoroeste from '../components/noroeste/MonitorNoroste';
import TablaNoroeste from '../components/noroeste/TablaNoroeste';
import MonitorVeracruz from '../components/veracruz/MonitorVeracruz';
import TablaVeracruz from '../components/veracruz/TablaVeracruz';
import MonitorTehuacan from '../components/tehuacan/MonitorTehuacan';
import TablaTehuacan from '../components/tehuacan/TablaTehuacan';
import MonitorCordoba from '../components/cordoba/MonitorCordoba';
import TablaCordoba from '../components/cordoba/TablaCordoba';
import Aciones_Preventivas from '../components/acciones_preventivas/Aciones_Preventivas';
import Regiones from '../components/regiones/MonitorRegiones';
import Last_farms_visited from '../components/last_farms_visited_by_user/Last_farms_visited';
import { AuthContext } from '../auth/AuthContext';
import TablaRegiones from '../components/regiones/TablaRegiones';

export const DashboardRoutes = () => {

    const { user:{user_detail } } = useContext(AuthContext);
    console.log('user_detail Dashboard', user_detail)
    const reg_id =  user_detail.reg_id
    const regiones = ['noroeste', 'veracruz', 'tehuacan', 'cordoba']
    const region_name = "/" + regiones[reg_id - 1]
    return (
        <>
            <Navbar />

            <div>
                <Switch>
                    <Route exact path="/noroeste" component={ MonitorNoroeste } />
                    <Route exact path="/tablanoroeste" component={ TablaNoroeste } />
                    <Route exact path="/veracruz" component={ MonitorVeracruz } />
                    <Route exact path="/tablaveracruz" component={ TablaVeracruz } />
                    <Route exact path="/tehuacan" component={ MonitorTehuacan } />
                    <Route exact path="/tablatehuacan" component={ TablaTehuacan } />
                    <Route exact path="/cordoba" component={ MonitorCordoba } />
                    <Route exact path="/tablacordoba" component={ TablaCordoba } />
                    <Route exact path="/regiones" component={ Regiones } />
                    <Route exact path="/tablaregiones" component={ TablaRegiones } />
                    <Route exact path="/acciones_preventivas" component={ Aciones_Preventivas } />
                    <Route exact path="/visitas" component={ Last_farms_visited } />
                    {/* <Route exact path="/marvel" component={ MarvelScreen } />
                    <Route exact path="/hero/:heroeId" component={ HeroScreen } />
                    <Route exact path="/dc" component={ DcScreen } />
                    <Route exact path="/search" component={ SearchScreen } /> */}

                    <Redirect to={region_name} /> {/* Ultima granja visitada */}
                </Switch>
            </div>


        </>
    )
}
