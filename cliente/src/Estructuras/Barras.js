import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import axios from 'axios';
import {
    Typography
} from "@rmwc/typography"
import '@rmwc/typography/styles';
import '@material/typography/dist/mdc.typography.css';

export default class Barras extends Component{

    constructor(props){
        super(props);
        this.state = {
            curTime: '',
            filtro1: ''
        }
        this.state3 = {
            respuesta: [],
            edad: [],
            cantidad: [],
            colores: [],
            data: [],
            opciones: [],
            type: 'bar'
        }

        this.setFiltro = this.setFiltro.bind(this);
        this.peticiones_Range = this.peticiones_Range.bind(this);
    }
    
    generar_RE(){
        var Caracte= ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"]
        var numero = (Math.random()*15).toFixed(0);
        return Caracte[numero];
    }

    //concatena la cadena para que sea un formato de cadena hexadecimal
    colorHex_RE(){
        var color = "";
        for(var index=0;index<6;index++){
            color= color + this.generar_RE();
        }
        return "#"+color;
    }

    //generar colores
    generarC_RE(){
        var coloresf=[];
        for (var i = 0; i < this.state3.respuesta.length ; i++){
            coloresf.push(this.colorHex_RE());
        }
        this.state3.colores = coloresf;
    }

    setFiltro = (filtro) => {
        this.setState({filtro1: filtro});
    }


    async peticiones_Range()
    {
        let peticion = {
            location: this.state.filtro1
        }
        console.log(peticion);
        //http://c21f70cc5e50.ngrok.io/Edades
        let url = localStorage.getItem("urlServerless") +"/Edades";
        await axios.post(url, peticion)
        .then(
            (response) =>{
                this.generarC_RE();
                if(response.data.length > 0) this.state3.respuesta = response.data;
                

        }).catch(err => {})

        this.state3.edad = []
        this.state3.cantidad = []
        this.state3.respuesta.forEach(item=>
        {
            this.state3.cantidad.push(item.count)
            this.state3.edad.push(item.legend)
        });
        var densityData = {
            label: 'Edad de Pacientes',
            data: this.state3.cantidad,
            backgroundColor: this.state3.colores,
            borderColor: this.state3.colores,
            borderWidth: 2,
            hoverBorderWidth: 0
        };
        this.state3.data = {
            labels: this.state3.edad,
            datasets: [densityData]
        };

        this.state3.opciones = {
            elements: {
                rectangle: {
                    borderSkipped: 'left',
                }
            }
        };
    }


    
    async componentDidMount() {
        try {
            setInterval( () => {
                this.setState({
                    curTime : new Date().toLocaleString()
                })
            },5000)
            setInterval(this.peticiones_Range, 5000);
        } catch (error) {
            console.log("Errores de render");
        }
    }


    componentWillUnmount() {
        clearInterval(this.peticiones_Range);
    }



    render(){

        return(
         
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <Typography use="headline3">Rango de Edades (Pacientes)</Typography>
                    <Bar data={this.state3.data} options={this.state3.opciones} legend={this.state3.legend}/>
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>
        )}



}