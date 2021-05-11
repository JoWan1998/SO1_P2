/* eslint-disable no-useless-constructor */
import React, {Component} from 'react'
import {
    Typography
} from "@rmwc/typography"
import '@rmwc/typography/styles';
import '@material/typography/dist/mdc.typography.css';
import TableDatos from "../Estructuras/TableDatosAlmacenadosBD";
import axios from 'axios';

export default class Datal extends React.Component{

    constructor(props){
        super(props);
        this.tableHeader = ["Nombre", "Pais", "Genero", "Edad", "Vacuna", "Way"];
        this.ObtenerDatos = this.ObtenerDatos.bind(this);
        this.childInventarioP = React.createRef();
    }


    async ObtenerDatos(){

    }

    render(){




        return(
            
            <div className="container-fluid">
                <br />
                <div className="row">
                    <div className="col col-lg-12 col-md-12 col-sm-12 col-12 order-sm-first order-first order-lg-last order-md-first">
                        <div className="card border-dark mb-3">
                            <div className="card-body">
                            <Typography use="headline3">Datos Almacenados</Typography>
                                <div className="table-responsive">
                                    <TableDatos data={this.tableHeader} ref={this.childInventarioP}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



}