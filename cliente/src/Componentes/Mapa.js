import React from 'react'
import Pastel from '../Estructuras/Pastel';
import DesNav from '../Navegacion/DesNav';
import Desplegable from '../Navegacion/Desplegable';
import 'leaflet/dist/leaflet.css'
import { MapContainer,Marker,TileLayer} from 'react-leaflet'
import './Mapa.css'

export default class Mapa extends React.Component{

    render(){
        return(
            
            <div className = "Mapa"><DesNav/> 
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
        );
    }



}