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
    this.state = {
        dataT: [],
        dataV: []
    }
    this.ObtenerDatosT5 = this.ObtenerDatosT5.bind(this);
}
    async ObtenerDatosT5(){
        axios.get('http://34.66.140.170:8080/top5/pacientes',{})
        .then(
            (response)=>{
                var data = []
                response.data.forEach(element => {
                    data.push(
                        {
                            Nombre: element.name,
                            Pais: element.location,
                            Genero: element.gender,
                            Edad: element.age
                        }
                    )
                });
                this.setState({dataT: data});
                if(this.childTopTen.current != null){
                    this.childTopTen.current.removeRow()
                    this.childTopTen.current.agregar_datos(data);
                }
            }
        ).catch(err=>{});
    }

    async componentDidMount() {
        try {
            setInterval(this.ObtenerDatosT5, 3000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    componentWillUnmount() {
        clearInterval(this.ObtenerDatosT5);
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