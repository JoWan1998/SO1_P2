import React,{Component} from 'react'
//import {Map} from 'react-leaflet'
import './Mapa.css'


import tasks from '../Data/data.json'



import 'bootstrap/dist/css/bootstrap.min.css';
import '../Estilos/Estilo.css'
import Mapa from '../Componentes/Mapa'

class General extends Component{

    state ={
        tasks: tasks,
        data: "ddd"
    }

    setdata(data){
        console.log(data)
    }

    render(){

        return(
            <div>
                <Mapa data = {this.state.data}/>
                
                <ul >
                    {this.state.tasks.map(e=>
                        <button onClick={this.setdata(e.location)} > {e.location} </button>
                    )}             
                </ul>
            </div>
        );
    }
}

export default General;