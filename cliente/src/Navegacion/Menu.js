
import React from 'react'
import { Link } from 'react-router-dom';
import {
    Typography
} from "@rmwc/typography"
import '@rmwc/typography/styles';
import '@material/typography/dist/mdc.typography.css';


class Menu extends React.Component{
    super(props){}
    render(){
        return(
 
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <ul className="navbar-nav ml-auto">
                            <Link className="navbar-brand" to="/Mapa">
                                <Typography use="headline6">Sistema Vacunacion</Typography>
                            </Link> 
                </ul>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
 
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="navbar-brand" to="/Almacen">
                                <Typography use="button">Almacenamiento</Typography>
                            </Link> 
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Vacuna">
                                <Typography use="button">Graficas Mongo/Redis</Typography>
                            </Link> 
                        </li>
                    </ul>
    
                </div>
            </div>
            </nav>      
        )
    }
}


export default Menu;