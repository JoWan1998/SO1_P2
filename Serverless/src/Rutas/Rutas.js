const express = require('express');
const router = express.Router();
const redis = require("redis");

const client = redis.createClient(6379,'localhost');

//http://35.223.156.4:7019/obtenerUsuarios


const sha1   = require('sha1');

client.on('error', function(err){
    console.log("Error: " + err)
});


router.post('/insert', async(req, res)=>{
    const data = req.body;
    data['service'] = 'Redis'
    try {
        var hash = sha1(JSON.stringify(data));
        data['hash'] = hash;
        client.set(hash, JSON.stringify(data));
        res.json(JSON.stringify(data));
    } catch (error) {
        console.log(error)
        res.status(500).json({'message':'failed' });
    }
});



// router.get('/ins',(req,res)=>{
//     var data_ = []
//     try {
//         client.multi()
//         .keys('*', function (err, replies) {
//            replies.map( function(reply, index) {
//                 client.get(reply, function(err, data){
//                     data_.push(JSON.parse(data));
//                     console.log(JSON.parse(data))
                    
//                 });
//             });
//         })
//         .exec(function (err, replies) {
//         });
//     } catch (error) {
        

//     }
//  res.send(JSON.parse(JSON.stringify(data)));
    
// });



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
    //retornamos lista ordenada y limitada a lo que entre
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



// obtener  
router.get('/ins',(req,res)=>{
    var data_ = []
    try {
        client.multi()
        .keys('*', function (err, replies) {
           
           replies.map( function(reply, index) {

                client.get(reply, function(err, data){
                    data_.push(JSON.parse(data));
                    console.log(JSON.parse(data));
                });
            });
        })
        .exec(function (err, replies) {
        });
    } catch (error) {
        
    }
    res.json(data_);
});


module.exports = router;