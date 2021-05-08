import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Pastel from '../Estructuras/Pastel';
import Desplegable from './Desplegable';


export default function DesNav(){

    return(
        <Router>
            <Desplegable/>
            <Route path='/Pastel'     component ={Pastel} />

        </Router>
    );
}
