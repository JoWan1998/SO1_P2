/* eslint-disable no-useless-constructor */
import React, {Component} from 'react'
import {
    Typography
} from "@rmwc/typography"
import '@rmwc/typography/styles';
import '@material/typography/dist/mdc.typography.css';
import TablePaisesRedis from "../Estructuras/TablePaisesRedis";
import TableDatos from "../Estructuras/TableDatosAlmacenadosBD";
import axios from 'axios';


export default class Vacuna extends React.Component{

  constructor(props){
    super(props);
    this.tableHeader = ["Pais", "Cantidad"];
    this.tableHeader1 = ["Nombre", "Pais", "Genero", "Edad"];
    this.childTopTen = React.createRef();
    this.childVacunados = React.createRef();
}

  render(){
    return (
            <div className="container-fluid">
                <br />
                <div className="row">
                    <div className="col col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card border-dark mb-3">
                            <div className="card-body">
                            <Typography use="headline3">Top 10 Paises con Más Vacunados</Typography>
                                <div className="table-responsive">
                                    <TableDatos data={this.tableHeader} ref={this.childTopTen}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-md-12 col-sm-12 col-12">
                        <div className="card border-dark mb-3">
                            <div className="card-body">
                            <Typography use="headline3">Ultimos 5 Vacunados por Pais</Typography>
                                <div className="table-responsive">
                                    <TablePaisesRedis data={this.tableHeader1} ref={this.childVacunados}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
  }


}