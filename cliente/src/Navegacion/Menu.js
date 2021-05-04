
import React from 'react'
import { Link } from 'react-router-dom';


class Menu extends React.Component{
    super(props){}
    render(){
        return(
 
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
            <ul className="navbar-nav ml-auto">
                            <Link className="navbar-brand" to="/">
                                SISTEMA DISTRIBUIDO
                            </Link> 
                </ul>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
 
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="navbar-brand" to="/Almacen">
                                Almacenamiento 
                            </Link> 
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/Mapa">
                            Mapa Interactivo
                            </Link> 
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link" to="/Vacuna">
                            Vacuna 
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