const express = require('express');
const mongoClient = require('mongodb').MongoClient
const urlMongo = "mongodb://db:27017/"
const nameDB = 'dataProject1';
const fs = require('fs');

const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: '5mb', extended: true }));

const port = 8080;

mongoClient.connect(urlMongo, { useUnifiedTopology: true })
.then(client => {
    console.log("Conectado a la base de datos!")
    const db = client.db(nameDB)
    const coleccion = db.collection('usuario')


    app.get('/', (req, res) => {
        console.log('inicio de api')
        res.send('API SOPES 1 :D');
    });

    app.post('/locus', (req, res) => {
        console.log("ENVIO-----------------------");
        console.log(req.body);
        console.log("RESPUESTA-------------------");
        res.send(req.body);
    });

    /* curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"name": "usuario","location": "guatemala","age": "33","infectedtype": "infeccion","state": "guatemala"}' \
    http://localhost:8080/nuevoRegistro
    */
    app.post('/nuevoRegistro', (req, res) => {
        const data = req.body;
        
		if(data.name == null || data.location == null || data.age == null || data.vaccine_type == null || data.gender == null ||
            data.name == "" || data.location == "" || data.age == 0 || data.vaccine_type == "" || data.gender == "")
		{
			res.send('Nulls encontrados');
		}else{
            const user = {
				"name": data.name,
				"location": data.location,
				"gender": data.gender,
				"age": data.age,
				"vaccine_type": data.vaccine_type,
				"way": data.way
			}

			coleccion.insertOne(user)
			.then(result => {
				console.log("Registro Insertado!");
				res.send('Registro Insertado!');
			})
			.catch(error => console.error("Error al insertar un registro: ", error));
		}
    });

    app.get('/deleteAll', (req, res) => {
        coleccion.drop().then(result => {
            console.log("Eliminado!")
            res.send("Eliminado!")
        }).catch(err => console.error(err))
    });

    app.get('/obtenerUsuarios', async (req, res) => {
        coleccion.find().toArray()
        .then(results => {
            console.log("Obtener Usuarios!");
            res.json(results)
        })
        .catch(error => console.error(error))
    });

    app.get('/top5/pacientes', async (req,res)=> {
        await coleccion.find( { name: { $ne: null } }).sort({$natural:-1}).limit(5).toArray()
        .then(result => {
            console.log("Top5/Pacientes!");
            res.json(result);
        })
        .catch(err => console.error("Error Top5 / pacientes:\n", err))
    });

    app.post('/genders', async (req, res) => {
        coleccion.find().toArray()
        .then(results => {
            console.log("Generos!");
            res.json(infect_(results, req.body.location))
        })
        .catch(error => console.error(error))
    });

    app.listen(port, () => {console.log(`Server corriendo en puerto ${port}!`) });
    
})
.catch(console.error)

function infect_(visitados, pais){
    try{
        const lista = []
        let cantidad = 0;
        //listamos solo datos que necesitamos
        visitados.forEach(element => {
            if(element.gender!= null && pais != undefined)
            {
                var __k = false;
                lista.forEach(element1 =>
                {
                    if(element1.state.toLowerCase() === element.gender.toLowerCase() && (element.location.toLowerCase().includes(pais.toString().toLowerCase()) || pais === ''))
                    {
                        element1.count = element1.count + 1;
                        __k = true;
                    }
                });
                if(!__k && (element.location.toLowerCase().includes(pais.toString().toLowerCase()) || pais === '')) lista.push({ state: element.gender.toLowerCase(), count: 1, porcent: 0});
            }
    
        });
    
        lista.forEach(element=>
        {
            cantidad += element.count;
        });
    
        lista.forEach(element1=>
        {
            element1.porcent = (element1.count/cantidad)*100;
        })
        return lista;
    } catch(error) {
        console.log(error)
        return [];
    }

}