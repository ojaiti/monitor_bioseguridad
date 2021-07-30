import React from 'react';
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
import Todas_regiones from '../components/todas_regiones/Todas_regiones';

export const DashboardRoutes = () => {


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
                    <Route exact path="/todas_regiones" component={ Todas_regiones } />
                    <Route exact path="/acciones_preventivas" component={ Aciones_Preventivas } />
                    {/* <Route exact path="/marvel" component={ MarvelScreen } />
                    <Route exact path="/hero/:heroeId" component={ HeroScreen } />
                    <Route exact path="/dc" component={ DcScreen } />
                    <Route exact path="/search" component={ SearchScreen } /> */}

                    <Redirect to="/noroeste" />
                </Switch>
            </div>


        </>
    )
}
