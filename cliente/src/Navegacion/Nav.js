import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Menu from './Menu';
import Almacen from '../Componentes/Almacen'
import Mapa from '../Componentes/Mapa'
import Vacuna from '../Componentes/Vacuna'

export default function Nav(){

    return(
        <Router>
            <Menu/>
            <Route path='/'            componet={Mapa} />
            <Route path='/Almacen'     component ={Almacen} />
            <Route path='/Mapa'        component ={Mapa} />
            <Route path='/Vacuna'      component ={Vacuna} />
        </Router>

    );
}
