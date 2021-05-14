import React, { Component  } from 'react';
import { WorldMap } from "react-svg-worldmap";
import paises from "../paises.json";
import axios from "axios";
import {
    ChipSet,
    Chip
} from "@rmwc/chip";
import '@rmwc/chip/styles';
import '@material/chips/dist/mdc.chips.css';
import '@rmwc/icon/icon.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@rmwc/icon/styles';
import {
    List,
    SimpleListItem
} from "@rmwc/list";
import '@rmwc/list/styles';
import '@material/list/dist/mdc.list.css';
import Pastel from '../Estructuras/Pastel';

import Barras from '../Estructuras/Barras';
import {
    Typography
} from "@rmwc/typography"
import '@rmwc/typography/styles';
import '@material/typography/dist/mdc.typography.css';
import TableVacunadosRedis from "../Estructuras/TableVacunadosRedis";

export default class Mapa extends Component{
    constructor(props){
        super(props);
        this.state = {
            filters: '',
            data: [],
            paises: [],
            dataPaises: [],
            dataGen: [],
            dataV: []
        };

        this.handlerClick = this.handlerClick.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.childPie = React.createRef();
        this.childBarra = React.createRef();
        this.childVacunadasP = React.createRef();
        this.tableHeader = ["name", "location", "gender", "age", "vaccine_type"];
        this.obtenerInfectados = this.obtenerInfectados.bind(this);
        this.personasVR = this.personasVR.bind(this);
        this.ObtenerDatosT51 = this.ObtenerDatosT51.bind(this);
    }

    async ObtenerDatosT51(){
        axios.get('http://34.66.140.170:8080/top5/pacientes',{})
        .then(
            (response)=>{
               // var data = []
                /*response.data.forEach(element => {
                    data.push(
                        {
                            Nombre: element.name,
                            Pais: element.location,
                            Genero: element.gender,
                            Edad: element.age
                        }
                    )
                    
                });*/
                this.setState({dataV: response.data});
               /* if(this.childVacunados.current != null){
                    this.childVacunados.current.removeRow()
                    this.childVacunados.current.agregar_datos(data);
                }*/
            }
        ).catch(err=>{});
    }

    async obtenerInfectados(){
        axios.get('http://34.66.140.170:8080/obtenerUsuarios',{})
        .then(
            (response)=>{
                var data = [];
                var dat = [];
                response.data.forEach(paisest=>{
                    paises.forEach(pais=>
                        {
                            let _in = false;
                            if(paisest.location.toString().toLowerCase().includes(pais.name.toString().toLowerCase())
                              || paisest.location.toString().toLowerCase().includes(pais.nom.toString().toLowerCase())
                              || paisest.location.toString().toLowerCase().includes(pais.nombre.toString().toLowerCase())){
                                data.forEach(dats=>{
                                    if(dats.country === pais.iso2){
                                        _in = true;
                                        dats.value = dats.value + 1;
                                    }
                                })
                                if(!_in)
                                {
                                    data.push({
                                        country: pais.iso2,
                                        value: 1
                                    });
                                    dat.push(
                                        {
                                            location: paisest.location,
                                            country: pais.iso2
                                        }
                                    )
                                }

                            }
                        })
                    
                })
                this.setState({data: data});
                this.setState({dataPaises: dat});
            }
        ).catch({});
    }

    async personasVR(){
        //'http://c21f70cc5e50.ngrok.io/obtenerUsuarios'
        let url = localStorage.getItem("urlServerless") +"/obtenerUsuarios";
        axios.get(url,{})
        .then(
            (response)=>{
                var dataGem = [];
                response.data.data.forEach(paises=>{
                        dataGem.push(paises);
                })
                this.setState({dataGen: dataGem});
                
            }
        ).catch({});       
    }

    async componentDidMount(){
        try{
            setInterval( () => {
                this.setState({
                    curTime : new Date().toLocaleString()
                })
            },5000)
            setInterval(this.obtenerInfectados, 5000);
            setInterval(this.personasVR, 5000);
            setInterval(this.ObtenerDatosT51, 5000);
        }catch(error){

        }
        
    }

    componentWillUnmount(){
        clearInterval(this.obtenerInfectados)
        clearInterval(this.personasVR)
        clearInterval(this.ObtenerDatosT51);
    }

    handlerClick(event, countryName, isoCode, value, prefix, suffix) {
        this.state.dataPaises.forEach(pais =>
            {
                if(pais.location.toString().toLowerCase().includes(countryName.toString().toLowerCase())){
                    this.setState({filters: pais.location})
                    if(this.childPie.current != null){
                        this.childPie.current.setFiltro(pais.location);
                    }
                    if(this.childBarra.current != null){
                        this.childBarra.current.setFiltro(pais.location);
                    }
                }
            })
    }

    removeFilter(){
        this.setState({filters: ''})
        if(this.childPie.current != null){
            this.childPie.current.setFiltro('');
        }

        if(this.childBarra.current != null){
            this.childBarra.current.setFiltro('');
        }
    }

    

    render(){

        const data = this.state.data;
        let indents = (this.state.filters==='')? '':( <Chip
                                                        key="my-chip"
                                                        label={this.state.filters}
                                                        onRemove={this.removeFilter}
                                                        trailingIcon="close"
                                                    />);

        let itemsito = []                                            
                                                   
        if(this.state.dataV.length>0)
            for (let i = 0; i < this.state.dataV.length; i++)
             itemsito.push(
             
                <SimpleListItem
                    text={"Paciente: "+this.state.dataV[i].name}
                    secondaryText={"Pais: " +this.state.dataV[i].location+", Edad: "+this.state.dataV[i].age}
                    meta="Vacunado"
                />
             
                );


        const stylingFunction = (context) => {
            const opacityLevel = 0.1 + (1.5 * (context.countryValue - context.minValue) / (context.maxValue - context.minValue))
            return {
                fill: context.country === "GT" ? "blue" : context.color, 
                fillOpacity: opacityLevel, 
                stroke: "green",
                strokeWidth: 1, 
                strokeOpacity: 0.2, 
                cursor: "pointer" 
                    }
        }

        const values = this.state.dataGen.filter((value)=> value.location.includes(this.state.filters))
                if(this.childVacunadasP.current != null)
                {
                    this.childVacunadasP.current.removeRow();
                    this.childVacunadasP.current.agregar_datos(values);
                }

        return(
            <div className="container-fluid" >
                <br />
                <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12 order-sm-last order-last order-lg-first order-md-last">
                        <div className="card border-dark mb-3">
                            <div className="card-body">
                                <WorldMap 
                                            color="#134E2A"
                                            title="PAISES VACUNADOS"
                                            value-suffix="COVID" 
                                            size="lg" 
                                            data={data}
                                            onClickFunction={this.handlerClick}
                                            styleFunction={stylingFunction}
                                            
                                        />
                            </div>
                            <div className="card-footer text-right">
                                <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 order-sm-first order-first order-lg-last order-md-first">
                        <div className="row">
                            <div className="col">
                                <div className="card border-dark mb-3">
                                    <div className="card-body">
                                        <ChipSet>
                                            {indents}
                                        </ChipSet>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="card border-dark mb-3">
                                        <div className="card-body">
                                            <List twoLine>
                                                {itemsito}
                                            </List>
                                        </div>
                                        <div className="card-footer text-right">
                                            <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                                        </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <Pastel ref={this.childPie} />
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <Barras ref={this.childBarra} />
                    </div>
                </div>
                <div className="row">
                    <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="card border-dark mb-3">
                            <div className="card-body">
                            <Typography use="headline3">Personas Vacunadas por Pais</Typography>
                                <div className="table-responsive">
                                    <TableVacunadosRedis data={this.tableHeader} ref={this.childVacunadasP}/>
                                </div>
                            </div>
                            <div className="card-footer text-right">
                                <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }



}