import React, { Component } from 'react'
import {
    DataTableCell,
    DataTableRow
} from '@rmwc/data-table';
import '@rmwc/data-table/styles';
import '@material/data-table/dist/mdc.data-table.css';
import '@rmwc/data-table/data-table.css';
import axios from 'axios';
import {
    IconButton
} from "@rmwc/icon-button";
import '@rmwc/icon-button/styles';
import '@material/icon-button/dist/mdc.icon-button.css';
import '@rmwc/icon/icon.css';
import '@material/ripple/dist/mdc.ripple.css';

export default class TableRowPaisesRedis extends Component{
    constructor(props) {
        super(props);
        this.state = {
            rowindex : props.rowindex ,
        }

        this.getRowsData = this.getRowsData.bind(this);
        this.removeRow = this.removeRow.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }  

    handleDelete(event){
        //eliminando registro
        let peticion = {
            data: {
                "idproducto" : this.props.row.idProducto.toString()
            }
        }
        
        axios.post('http://35.192.161.228:3000/producto/delete',peticion)
        .then(res=>{
            if(res.data.status === 'success')
            {
                alert('Producto Eliminado: '+this.props.row.PRODUCTO)
            }
        }).catch(er=>{});

    }

    removeRow(){
        this.props.handleRemove(this.state.index)
    }

    onTrigger = (event) => {
        this.props.parentCallback(this.props.row.SKU);
    }

    getRowsData = function(){
        var items = [this.props.row];
        var keys = this.props.keys;
        return items.filter((item, idx) => idx < 3).map((row, index)=>{
        return <RenderRow key={index} data={row} keys={keys}/>
        })
    }
//{this.getRowsData()}
    render() {
        return (
            <DataTableRow>
                {this.getRowsData()}
                <DataTableCell key={this.state.rowindex+"OPCIONES"}>
                    <IconButton
                        label="Visualizar"
                        icon="visibility"
                        onClick={this.onTrigger}
                    />
                    <IconButton
                        label="Eliminar"
                        icon="delete"
                        onClick={this.handleDelete}
                    />
                </DataTableCell>
            </DataTableRow>
        )
    }
}

const RenderRow = (props) =>{
    return props.keys.map((key, index)=>{
        return <DataTableCell key={key+props.data[key]+index}>{props.data[key]}</DataTableCell>//<td key={props.data[key]}>{props.data[key]}</td>
    })
}
