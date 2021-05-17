UNIVERSIDAD DE SAN CARLOS DE GUATEMALA

FACULTAD DE INGENIERÍA

ESCUELA DE CIENCIAS Y SISTEMAS

SISTEMAS OPERATIVOS 1

PROYECTO 2
-------------------------------------------
###### Guatemala, Mayo 2021

### INTEGRANTES

#### Grupo 20

|Carnet|Nombre|
|--|--|
|201612331|José Orlando Wannan Escobar|
|201504051|Asunción Mariana Sic Sor|
|201602440|Jonathan Baudilio Hidalgo Perez|
|201612101|Abner Abisai Hernández Vargas|

### TABLA DE CONTENIDO


* Descripcion 

Se solicita construir un sistema genérico de arquitectura distribuida que muestre
estadísticas en tiempo real utilizando Kubernetes y service mesh como Linkerd y
otras tecnologías Cloud Native. En la última parte se utilizará una service mesh para
dividir el tráfico. Adicionalmente, se generará faulty traffic con Linkerd y Chaos Mesh
para implementar Chaos Engineering. Este proyecto se utilizará para visualizar las
personas vacunadas contra la COVID-19 alrededor del mundo.


![This is a alt text.](./Imagenes/im1.png "This is a sample image.")


* Servicios de Mensajería

    * [GRPC](https://github.com/JoWan1998/SO1_P2/blob/master/GRPC/README.md)
    * [Kafka](https://github.com/JoWan1998/SO1_P2/blob/master/KAFKA/README.md)
    * [Redis Pub/Sub]()
    * [Defaulty Traffic]()
    

* Tecnologias
    * [Locust](https://github.com/JoWan1998/SO1_P2/tree/master/LOCUST)
    * [Traffic splitting ]()
    * [Chaos Engineering ]()
    * [Linkerd]()


* Almacenamiento
    * [Mongo BD](https://github.com/JoWan1998/SO1_P2/blob/master/NODEJS/MANUAL.md)
    * [Redis BD](https://github.com/JoWan1998/SO1_P2/blob/master/RedisBD/README.md)

* Serverless

    * [API Serverless](https://github.com/jonhiidalgo92/api)
    * [Deploy]()
    * [Funcionamiento]()




* Aplicacion Web

    * [Aplicacion]()
    * [Deploy]()

* Reporte de Preguntas

    * __¿Cómo se pueden interpretar las cuatro pruebas de faulty traffic?__

    <table>
    <tr>
    <td>Caso</td>
    <td>Escenario</td>
    </tr>
    <tr>
    <td>1</td>
    <td>Cola 1 &#8594; 50% <br>
    Cola 2 &#8594; 50% </td>
    </tr>
    <tr>
    <td>2</td>
    <td>Cola 1 &#8594; 33.33% <br>
    Cola 2 &#8594; 33.33% <br>
    Cola 3 &#8594; 33.33%</td>
    </tr>
    <tr>
    <td>3</td>
    <td>Cola 1 &#8594; 33.33% <br>
    Cola 2 &#8594; 33.33% <br>
    Faulty Traffic &#8594; 33.33%</td>
    </tr>
    <tr>
    <td>4</td>
    <td>Cola 1 &#8594; 50% <br>
    Faulty Traffic &#8594; 50%</td>
    </tr>
    </table>

    Por el comportamiento dado en las pruebas mayormente kafka logra dar mayor respuesta a los otros 2 servicios, muy seguido de grpc, también es necesario resaltar que estos dos servicios cuentan con 3 réplicas y redis solo con una puesto que se trabaja con un solo canal y esto puede llegar a duplicar la información en nuestras bases de datos.

    * __¿Qué patrones de conducta fueron descubiertos?__

    Se pudo notar que la conducta por parte de la recepción de mensajes en las Bases de datos manejadas, apuntaban más por kafka por los múltiples beneficios que este servicio de mensajería posee. 

    * __¿Qué sistema de mensajería es más rápido?__

    GRPC

    __¿Por qué?__

    Por utilizar un protocolo superior como lo es  HTTP/2 

    * __¿Cuántos recursos utiliza cada sistema de mensajería?__

    |Mensajería|CPU Requests|CPU Limits|Memory Requests|Memory Limits|
    |--|--|--|--|--|
    |grpc-client|10m (0%)|100m (5%)|10Mi (0%)|50Mi (0%)|
    |redis-client|10m (0%)|100m (5%)|10Mi (0%)|50Mi (0%)  
    |kafka-client|10m (0%)|100m (5%)|10Mi (0%)|50Mi (0%)
    |kafka|200m (10%)|1 (51%)|384Mi (6%)|384Mi (6%)|
    |my-kafka-project|100m (5%)|1 (51%)|128Mi (2%)|256Mi (4%)

    Además Redis necesita de una máquina virtual para manejar el servicio para el pub/sub. 

    * __¿Cuáles son las ventajas y desventajas de cada servicio de mensajería?__

    <table>
    <tr>
    <td>Mensajería</td>
    <td>Ventajas</td>
    <td>Desventajas</td>
    </tr>
    <tr>
    <td>GRPC</td>
    <td>
    La tecnología es fácil de aplicar ya que, al crear los archivos . proto, emplea un IDL sencillos <br><br>
    Los programas anticuados pueden ampliarse con una potente interfaz gRPC , de forma que puedan transmitir archivos grandes notablemente más rápido. <br><br>
    Fácilmente escalable. <br><br>
    HTTP/2 no solo aumenta la eficiencia gracias a la multiplexación y el streaming bidireccional, sino que también permite comprimir los encabezados para reducir el volumen de datos de las solicitudes y respuestas en la red de manera notable. <br><br>
    Los Protocol Buffers y los compiladores Protobuf permiten una comunicación sin restricciones.
    </td>
    <td>
    Las pruebas de las interfaces gRPC todavía cuentan con mucho margen de mejora.<br><br>
    Los mensajes gRPC codificados con Protobuf no son legibles sin ayuda técnica.<br><br>
    Al analizar el tráfico de datos y, sobre todo, en la localización y solución de errores (debug) hay que usar instancias adicionales para transmitir el código de forma legible para detectar los errores.<br><br>
    Al conectar ordenadores a través de largas distancias, gRPC está mucho más expuesto que un sistema local. <br><br>
    Depende de una red estable y potente y de que la red, el tráfico de datos, los protocolos de transmisión y el cliente y el servidor no se conviertan en presa fácil de los hackers. <br><br>
    </td>
    </tr>
    <tr>
    <td>KAFKA</td>
    <td>Alto rendimiento <br>
    Baja latencia <br>
    Escalabilidad <br>
    Persistencia <br>
    Confiabilidad
    </td>
    <td>
    Dependencia con Apache Zookeeper <br><br>
    Sin enrutamiento de mensajes <br><br>
    Carece de componentes de monitorización
    </td>
    </tr>
    <tr>
    <td>Redis Pub/Sub</td>
    <td>
    Mayor rapidez al trabajar con memoria primaria <br><br>
    Admite tipos de datos enriquecidos <br><br>
    Funciones enriquecidas
    </td>
    <td>
    Aunque Redis en sí tiene una estrategia de caducidad de claves, aún debe estimarse y guardarse con anticipación. Si la memoria crece demasiado rápido, debe eliminar los datos con regularidad <br><br>
    Durante la sincronización, debido a la necesidad de generar archivos RDB y transferirlos, ocupará la CPU del host y consumirá ancho de banda de la red. <br><br>
    Si la memoria crece demasiado rápido, debe eliminar los datos con regularidad.
    </td>
    </tr>
    </table>

    * __¿Cuál es el mejor sistema de mensajería?__
    
    En lo que respecta a rapidez tenemos a GRPC

    * __¿Cuál de las dos bases de datos se desempeña mejor y por que?__

    Dependiendo la utilidad de ambas ya que en lo que respecta a velocidad redis es la mejor, por almacenar la información en caché, en lo que respecta a otros aspectos como lo son los recursos , no se requieren potentes recursos para poder trabajar con Mongodb. 

    * __¿Cómo se refleja en los dashboards de linkerd los experimentos de chaos mesh?__

    Se reflejan en las estadísticas de un namespace, deployment o pod, ya que estos afectan directamente el rendimiento de los mismos.

    * __¿En qué se diferencia cada uno de los experimentos realizados?__

    |Experimento|Descripción|
    |:--:|:--:|
    |Slow Network|Provoca delay en la red, retrasando los mensajes|
    |Pod Kill|Elimina un pod por completo|
    |Pod Failure|Inyecta periódicamente errores a los pod|
    |Container Kill|Mata el contenedor especificado en  pods seleccionados|

    * __¿Cuál de todos los experimentos es el más dañino?__

    Pod-Kill ya que elimina un pod, y si no se cuenta con replicación el sistema no funcionara.