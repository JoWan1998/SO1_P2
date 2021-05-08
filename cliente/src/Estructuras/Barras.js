import React from 'react'

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
export default class Barras extends React.Component{
    state3 ={
        respuesta: [],
        edad: [],
        cantidad: [],
        colores: [],
        data: [],
        opciones: [],
        type: 'bar'
    }



    async peticiones_Range()
    {
        await fetch('http://35.222.55.115:8080/Ages').then(res=>{
            res.json().then(result=>
            {
                let values = JSON.parse(JSON.stringify(result));
                this.generarC_RE();
                if(values.length > 0) this.state3.respuesta = values;
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

            })
        }).catch(err => alert(err))
    }



    render(){

        return(
         
            <div className="row">
            <div className="col col-lg-12 col-md-12 col-sm-12">
                <div className="card border-primary mb-3" id="RangoEdades">
                    <div className="card-header">
                        <h2>Rango de Edades (Pacientes)</h2>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <Bar data={this.state3.data} options={this.state3.opciones} legend={this.state3.legend}/>
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