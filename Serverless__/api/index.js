const express = require('express');
const cors = require('cors');
const config = require('./config/config')
const func = require('./dao/crud')

const app = express();



//edades por pais
function age_(pacientes,pais)
{
    const lista = []
    const ranges = [10,20,30,40,50,60,70,80,90,100]
    var ant = 0;

    ranges.forEach(ran=>
    {
        lista.push({ inicial: ant, final: ran, legend: ant + " - "+ran, count: 0});
        ant = ran;
    })

    pacientes.forEach(paciente=>
    {
        if((paciente.age != null && Number(paciente.age)) && (paciente.location.toLowerCase() == pais.toLowerCase()))
        {
            lista.forEach(element=>
            {
                if(Number(paciente.age.toString()) >=  element.inicial &&
                    Number(paciente.age.toString()) <= element.final) element.count = element.count + 1;
            });
        }
    })

    return lista;
}


//Top 10 paices con mas vacunados
function top_(visitados){
    var lista = []
    var cont = 0
    visitados.forEach(element => {
        if(element.location != null)
        {
            var __in = false;
            lista.forEach(element1=>{
                if(element1.location === element.location.toLowerCase())
                {
                    element1.valor = element1.valor + 1;
                    __in = true;
                }
            })
            if(!__in) lista.push( { location: element.location.toLowerCase(), valor: 1});
        }
    });

    //retornamos lista ordenada y limitada a lo que entre
    return lista.sort(((a, b) => b.valor - a.valor)).slice(0,10);
}

//Personas vacunadas por cada pais
function vac_(visitados,pais){
    var lista = []
    var cont = 0
    visitados.forEach(element => {
        if((element.location != null)  && (element.location.toLowerCase() == pais.toLowerCase()))
        {
             lista.push( { name: element.name, gender: element.gender, age: element.age});
        }
    });
    return lista;
}


//obtengo todos los paices
function pais_(visitados){
    var lista = []
    visitados.forEach(element => {
        if(element.location != null)
        {
            var __in = false;
            lista.forEach(element1=>{
                if(element1.location === element.location.toLowerCase()) __in = true;
            });
            if(!__in) lista.push( { location: element.location.toLowerCase()});
        }
    });

    //retornamos lista ordenada y limitada a lo que entre
    return lista;
}



var resp = function (res, data, code, next) {
    res.status(code).json(data);
    return next();
};


app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '5mb', extended: true }));

app.listen(config.init_port);
console.log("Aplicación corriendo en el puerto ", config.init_port);

app.get('/', (req, res) => {
    res.send('API para redisDB :D');
});

app.post('/nuevoRegistro', function (req, res, next) {
    var body = req.body;
    func.add_register(body, function (response, code) {
        resp(res, response, code, next)
    })
});


app.get('/deleteAll', function (req, res, next){
    func.delete_all(function (response, code){
        resp(res, response, code, next)
    });
});



//####################################  REPORTES OBTENIDOS
//Obtener todos los usuarios
app.get('/obtenerUsuarios', function (req, res, next) {
    func.get_all(function (response, code){
        resp(res, response, code, next)
    })
});

//obtener el top 10 de mas vacunados
app.get('/Gettop', function (req, res, next) {
    func.get_all(function (response, code){
        resp(res, top_(response.data), code, next)
    })
});

// obtenemos los rangos de edad del pais requerido
app.get('/Edades', function (req, res, next) {
    func.get_all(function (response, code){
        resp(res, age_(response.data,req.body.location), code, next)
    })
});

//Obtener personas vacunadas por cada pais 
app.get('/Vacunados', function (req, res, next) {
    func.get_all(function (response, code){
        resp(res, vac_(response.data,req.body.location), code, next)
    })
});

//Obtener todos los paices
app.get('/Paices', function (req, res, next) {
    func.get_all(function (response, code){
        resp(res, pais_(response.data), code, next)
    })
});



//Funcion de prueba en la nuve
app.get('/prueba', function (req, res, next) {
    data =[{holi:"Estoy bien.. "}]
    func.get_all(function (response, code){
        resp(res, data, code, next)
    })
});

