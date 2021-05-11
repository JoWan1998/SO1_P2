import React from 'react'
import Pastel from '../Estructuras/Pastel';
import DesNav from '../Navegacion/DesNav';
import Desplegable from '../Navegacion/Desplegable';
import 'leaflet/dist/leaflet.css'
import { MapContainer,Marker,TileLayer} from 'react-leaflet'

import './Mapa.css'

export default class Mapa extends React.Component{

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
        return(
            
        <div>
            <div className = "Mapa">
             <h1>Maps in ReactJS</h1>	
                <div className="Map">
                    <MapContainer className="Map-container" center={[0, 0]} zoom={5}>
                        <TileLayer 
                            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
                            url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
                        />
                    </MapContainer>
                </div> 
            </div>


            <div>
            <td><button onClick={this.toggleShow}>Details</button></td>
            </div>


        </div>
        );
    }



}