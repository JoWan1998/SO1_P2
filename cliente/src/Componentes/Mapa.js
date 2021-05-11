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

export default class Mapa extends Component{
    constructor(props){
        super(props);
        this.state = {
            filters: '',
            data: [{ country: "gt", value: 1},
            { country: "cn", value: 1 },
            { country: "in", value: 2 },
            { country: "us", value: 3 }],
            paises: [
                { country: "Guatemala", value: 1},
                { country: "China", value: 1 },
                { country: "India", value: 2 },
                { country: "Estados Unidos", value: 3 },
                { country: "United States", value: 3 }
            ],
            dataPaises: [
                { country: "Guatemala", value: 1},
                { country: "China", value: 1 },
                { country: "India", value: 2 },
                { country: "United States", value: 3 }
            ]
        };

        this.handlerClick = this.handlerClick.bind(this);
        this.removeFilter = this.removeFilter.bind(this);
        this.childPie = React.createRef();
        this.childBarra = React.createRef();
    }

    obtenerInfectados(){
        axios.get('',{})
        .then(
            (response)=>{
                paises.forEach(pais=>
                    {
                        if(pais.name === response.data.name || pais.nom === response.data.name){
                            console.log(pais.iso2, pais.iso3)
                        }
                    })
            }
        ).catch({});
    }

    handlerClick(event, countryName, isoCode, value, prefix, suffix) {
        this.setState({filters: countryName})
        if(this.childPie.current != null){
            this.childPie.current.setFiltro(countryName);
        }
        if(this.childBarra.current != null){
            this.childBarra.current.setFiltro(countryName);
        }
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

    state={
        show:true,
        paices:[]
    }

    toggleShow = () =>{
        this.setState({show: !this.state.show})
        console.log(this.props.data)
    }

    
    async GetPaices(){
        var peticion   = await fetch("http://35.222.55.115:8080/type")  
        var paices = await peticion.json();

        this.setState({paices: paices});

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
                                                   
        if(this.state.paises.length>0)
            for (let i = 0; i < this.state.paises.length; i++)
             itemsito.push(
             
                <SimpleListItem
                    text={this.state.paises[i].country}
                    secondaryText={"Infectados: " +this.state.paises[i].value}
                    meta="Vacunados!"
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
            </div>


        </div>
        );
    }



}