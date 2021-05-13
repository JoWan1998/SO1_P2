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
        this.state ={
            data: []
        }
        this.tableHeader = ["Nombre", "Pais", "Genero", "Edad", "Vacuna", "Way"];
        this.ObtenerDatos = this.ObtenerDatos.bind(this);
        this.childInventarioP = React.createRef();
    }

    async ObtenerDatos(){
        axios.get('http://34.66.140.170:8080/obtenerUsuarios',{})
        .then(
            (response)=>{
                var data =[]
                response.data.forEach(element => {
                    data.push({
                        Nombre: element.name,
                        Pais: element.location,
                        Vacuna: element.vaccine_type,
                        Edad: element.age,
                        Way: element.way,
                        Genero: element.gender
                    })
                });
                this.setState({data: data});
                if(this.childInventarioP.current != null){
                    this.childInventarioP.current.removeRow();
                    this.childInventarioP.current.agregar_datos(data);
                }
            }
        ).catch(err=>{})
    }

    async componentDidMount() {
        try {
            setInterval(this.ObtenerDatos, 3000);
        } catch (error) {
            console.log("Errores de render");
        }

    }

    componentWillUnmount() {
        clearInterval(this.ObtenerDatos);
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