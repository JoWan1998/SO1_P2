import React, { Component } from 'react'
import axios from 'axios';
import CanvasJSReact from '../Librerias/canvasjs.react';
import 'bootstrap/dist/css/bootstrap.min.css';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;




const url = 'http://localhost:5000/' 


var datap = [
    { y: 1400, label: "Prospects" },
    { y: 1212, label: "Qualified Prospects" },
    { y: 1080, label: "Proposals" },
    { y: 665,  label: "Negotiation" },
    { y: 578, label: "Final Sales" }
];

const options = {
    animationEnabled: true,
    title:{
        text: "Top 5 departamentos infectados"
    },
    data: [{
        type: "funnel",
        toolTipContent: "<b>{label}</b>: {y} <b>({percentage}%)</b>",
        indexLabelPlacement: "inside",
        indexLabel: "{label} ({percentage}%)",
        dataPoints: datap
    }]
}

export default class Tabla extends Component{

    state = {
        curTime : null,
        data:[]
    }


      
      peticionGet=()=>{
        axios.get((url)).then(response=>{
            this.setState({data: response.data});
        }).catch(error=>{
            console.log(error.message);
        })
      }


      componentDidMount(){
        this.peticionGet();
      }

      render(){

              return(
                <div className="row">
                    <div className="col col-lg-12 col-md-12 col-sm-12">
                        <div className="card border-primary mb-3" id="top5departamentosfunnel">
                            <div className="card-header">
                                <h2>Top 5 departamentos infectados</h2>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <CanvasJSChart options = {options} onRef={ref => this.chart5 = ref}/>
                                </div>
                            </div>
                            <div className="card-footer text-right">
                                <strong>Last Update on:</strong>&nbsp;<span className="badge badge-info">{this.state.curTime}</span>
                            </div>
                        </div>

                    </div>
                </div>
              )}
}
