import { React, Component  } from 'react';
import { WorldMap } from "react-svg-worldmap";
import paises from "../paises.json";
import axios from "axios";
import {
    TextField
} from "@rmwc/textfield";
import '@rmwc/textfield/styles';
import '@material/textfield/dist/mdc.textfield.css';
import '@material/floating-label/dist/mdc.floating-label.css';
import '@material/notched-outline/dist/mdc.notched-outline.css';
import '@material/line-ripple/dist/mdc.line-ripple.css';
import '@material/ripple/dist/mdc.ripple.css';
import '@rmwc/icon/icon.css';
import {
    ChipSet,
    Chip
} from "@rmwc/chip";
import '@rmwc/chip/styles';
import '@material/chips/dist/mdc.chips.css';
import '@rmwc/icon/icon.css';
import '@material/ripple/dist/mdc.ripple.css';
import {
    SimpleDialog
} from "@rmwc/dialog";
import '@rmwc/dialog/styles';

export default class Mapa extends Component{
    constructor(props){
        super(props);
        this.state ={
            data:[
                    { country: "gt", value: 10020233131}
               ],
            filters: [],
            titulo: '',
            informacion: '',
            open: false
        }

        this.handlerClick = this.handlerClick.bind(this);
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

    }

    render(){
        const data = this.state.data;
        let indents = [];
        if(this.state.CategoriasProducto.length>0)
            for (let i = 0; i < this.state.CategoriasProducto.length; i++)
                indents.push(<Chip selected label={this.state.CategoriasProducto[i]} key={"v"+i.toString()} />);
        return(
            <div className="container-fluid" >
                <SimpleDialog
                    title={this.state.titulo}
                    body={this.state.informacion}
                    open={this.state.open}
                    onClose={evt => {
                        this.setState({open: false})
                    }}
                />
                <div className="row">
                    <div className="col-lg-7 col-md-12 col-sm-12 order-sm-last order-last order-lg-first order-md-last">
                        <div className="card border-dark mb-3">
                            <div className="card-body">
                            <WorldMap 
                                color="green"
                                value-suffix="people" 
                                size="lg" 
                                data={data}
                                onClickFunction={this.handlerClick}
                            />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12 col-sm-12 order-sm-first order-first order-lg-last order-md-first">
                        <div className="card border-dark mb-3">
                            <div className="card-body">
                                <ChipSet>
                                    {indents}
                                </ChipSet>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



}