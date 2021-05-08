import React from 'react'
import { Link } from 'react-router-dom';


export default class Desplegable extends React.Component{

    render(){

        return(

             <div> 
                <div className="btn-group">
                    <button className="btn btn-secondary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Reportes 
                    </button>
                    <ul className="dropdown-menu">
 
                        <li> <Link className="navbar-brand" to="/Pastel">
                            Grafica Pastel
                            </Link>  
                        </li>
                    </ul>
                </div>
             </div>

        );

    }

}