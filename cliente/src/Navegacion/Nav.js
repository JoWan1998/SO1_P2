import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Menu from './Menu';
import Almacen from '../Componentes/Almacen'
import Mapa from '../Componentes/Mapa'
import Vacuna from '../Componentes/Vacuna'

import General from '../Componentes/General'


export default function Nav(){

    return(
        <Router>
            <Menu/>
            <Route path='/'            componet={Mapa} />
            <Route path='/Almacen'     component ={Almacen} />
            <Route path='/Mapa'        component ={General} />
            <Route path='/Vacuna'      component ={Vacuna} />
        </Router>

    );
}
