const express = require('express');
const app = express();
var cors = require('cors');
const morgan = require('morgan');



//settings
app.set('port', process.env.PORT || 5000);
app.use(cors());

//middlewares 
app.use(morgan('dev')); 
app.use(express.json({limit:'5mb',extended:true}));


//rutas para procesar datos
app.use(require('./Rutas/Rutas'));

//iniciando el server 
app.listen(app.get('port'),()=>{
    console.log('server on port', app.get('port'))
})
