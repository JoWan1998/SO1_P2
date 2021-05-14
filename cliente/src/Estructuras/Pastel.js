import React, { Component } from 'react'
import {Pie} from 'react-chartjs-2'
import {
    Typography
} from "@rmwc/typography"
import '@rmwc/typography/styles';
import '@material/typography/dist/mdc.typography.css';
import axios from 'axios';


export default class Pastel extends Component {

    constructor(props){
        super(props);

        this.state ={
            respuesta:[],
            estado:[],
            porcentajes:[],
            colores:[],
            data:[],
            opciones:[],
            filtro: '',
            curTime: ''
        }
        this.setFiltro = this.setFiltro.bind(this);
        this.peticion = this.peticion.bind(this);
    }
    
    async peticion(){
        // var peticion   = await fetch("http://35.222.55.115:8080/type")  
        // var respuestat = await peticion.json();

        let peticion = {
            location: this.state.filtro
        }
        //genders
        var respu = []
        console.log(peticion);
        await axios.post("http://34.66.140.170:8080/genders", peticion)
        .then(
            (response)=>{
                respu = response.data;
                var respuestat = respu;
                this.setState({respuesta: respu});

                var estadot=[]
                var porcentajet=[]

                this.state.respuesta.forEach((elemento) => {
                    estadot.push(elemento.state);
                    porcentajet.push(elemento.porcent);
                });

                this.setState({estado: estadot, porcentajes: porcentajet});
                this.generarC_();
                this.configuracionG_();
            }
        )
        .catch(err=>{});

        /*
        var respu = [{
            gender: 'male',
            porcent: 3
        },
        {
            gender: 'female',
            porcent: 66
        }]*/

        
    }
    //Generar Caracter de manera aleatoria
    generar_(){
        var Caracte= ["a","b","c","d","e","f","1","2","3","4","5","6","7","8","9"]
        var numero = (Math.random()*15).toFixed(0);
        return Caracte[numero];
    }
    //concatena la cadena para que sea un formato de cadena hexadecimal
    colorHex_(){
        var color = "";
        for(var index=0;index<6;index++){
            color= color + this.generar_();
        }
        return "#"+color;
    }

    setFiltro = (filtro) => {
        this.setState({filtro: filtro});
    }

    //generar colores
    generarC_(){
        var coloresf=[];
        for (var i = 0; i < this.state.respuesta.length ; i++){
            coloresf.push(this.colorHex_());
        }
        this.setState({colores:coloresf});
        console.log(this.state.colores);
    }
    //configuramos la grafica
    configuracionG_(){
        const data= {
            labels: this.state.estado,
            datasets:[{
                data: this.state.porcentajes,
                backgroundColor: this.state.colores
            }]
        };
        const opciones={
            responsive:true,
            maintainAspectRatio: false,
            pieceLabel:{
                render: function(args) {
                    return args.label+": "+args.value +"%";
                },
                fontSize: 10,
                fontColor: '#ffff',
                fontFamily: 'Arial'
            }
        }
        //almacenamos
        this.setState({data: data, opciones: opciones});
    }
    //ma
    async componentDidMount(){
        try{
            setInterval( () => {
                this.setState({
                    curTime : new Date().toLocaleString()
                })
            },5000)
            setInterval(this.peticion, 5000);
        }catch(error){

        }
        
    }

    componentWillUnmount(){
        clearInterval(this.peticion)
    }

    render() {
        return (
            <div className="card border-dark mb-3">
                <div className="card-body">
                    <Typography use="headline3">Generos Vacunados por Pais</Typography>
                    <Pie data={this.state.data} opciones={this.state.opciones}/>
                </div>
                <div className="card-footer text-right">
                    <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                </div>
            </div>

        )
    }


}


