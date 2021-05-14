# Kafka con Strimzi

Crear un cluster nuevo, el archivo de manifiesto sería el siguiente

```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: Kafka
metadata:
  name: kafka
spec:
  kafka:
    replicas: 1
    listeners:
      - name: plain
        port: 9092
        type: internal
        tls: false
      - name: tls
        port: 9093
        type: internal
        tls: true
        authentication:
          type: tls
      - name: external
        port: 9094
        type: nodeport
        tls: false
    storage:
      type: jbod
      volumes:
      - id: 0
        type: persistent-claim
        size: 100Gi
        deleteClaim: false
    config:
      offsets.topic.replication.factor: 1
      transaction.state.log.replication.factor: 1
      transaction.state.log.min.isr: 1
  zookeeper:
    replicas: 1
    storage:
      type: persistent-claim
      size: 100Gi
      deleteClaim: false
  entityOperator:
    topicOperator: {}
    userOperator: {}
```

Esperar a realizar deployment del cluster con

```zsh
kubectl wait kafka/my-cluster --for=condition=Ready --timeout=300s -n my-kafka-project
```

Cuando el cluster esté listo, crear un _Publisher_ y un _Subscriber_ 

```yaml
apiVersion: kafka.strimzi.io/v1beta2
kind: KafkaTopic
metadata:
  name: my-topic
  labels:
    strimzi.io/cluster: "my-cluster"
spec:
  partitions: 3
  replicas: 1
```

## Publisher

Es el encargado de enviar el mensaje al [Subscriber](#subscriber)

1. Primero utiliza un manejador para recibir el JSON que contiene el mensaje con el método ```manejador``` 

```golang
func manejador(w http.ResponseWriter, r *http.Request) {
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println("response Body:", string(body))

	value := string(body)
	mesage, _ := sjson.Set(value, "way", "Kafka")

	resultado := mesage
	go produce(context.Background(), mesage, resultado)
	w.Write([]byte(resultado))
}
```

2. Luego, mediante el método de ```produce``` envia el mensaje al [Subscriber](#subscriber)

```golang
func produce(ctx context.Context, mensaje string, resultado string) {
	// initialize a counter
	i := 0

	// intialize the writer with the broker addresses, and the topic
	w := kafka.NewWriter(kafka.WriterConfig{
		Brokers: []string{brokerAddress},
		Topic:   topic,
	})

	// each kafka message has a key and value. The key is used
	// to decide which partition (and consequently, which broker)
	// the message gets published on
	err := w.WriteMessages(ctx, kafka.Message{
		Key: []byte(strconv.Itoa(i)),
		// create an arbitrary message payload for the value
		Value: []byte(mensaje),
	})
	if err != nil {
		resultado = "error al escribir"
	}

}
```

## Subscriber

Este se encarga de consumir el mensaje y luego enviar los datos a las bases de datos MongoDB y Redis DB respectivamente

```golang
func consume(ctx context.Context) {
	// initialize a new reader with the brokers and topic
	// the groupID identifies the consumer and prevents
	// it from receiving duplicate messages
	r := kafka.NewReader(kafka.ReaderConfig{
		Brokers: []string{brokerAddress},
		Topic:   topic,
		GroupID: "my-group",
	})
	for {
		// the `ReadMessage` method blocks until we receive the next event
		msg, err := r.ReadMessage(ctx)

		if err != nil {
			panic("could not read message " + err.Error())
		}

		b := []byte(string(msg.Value))
		resp, err := http.Post("http://34.66.140.170:8080/nuevoRegistro", "application/json",
			bytes.NewBuffer(b))

		if err != nil {
			fmt.Print(err)
		}

		body, err := ioutil.ReadAll(resp.Body)
		fmt.Println(string(body))

		if err != nil {
			fmt.Print(err)
		}

		resp2, err := http.Post("http://35.223.156.4:7019/nuevoRegistro", "application/json",
			bytes.NewBuffer(b))

		if err != nil {
			fmt.Print(err)
		}

		body2, err := ioutil.ReadAll(resp2.Body)
		fmt.Println(string(body2))

		if err != nil {
			fmt.Print(err)
		}
		// after receiving the message, log its value
		fmt.Println("received: ", string(msg.Value))
	}
}
```

## Dockerfile

Los archivos encargados de dockerizar los contenedores y construirlos, para seguidamente subirlos a Docker Hub

### Dockerfile Publisher

```Dockerfile
FROM golang

WORKDIR /Server1

COPY . /Server1

RUN go get -u github.com/segmentio/kafka-go
RUN go get -u github.com/tidwall/sjson

EXPOSE 80

CMD [ "go", "run", "Publisher.go"]
```

### Dockerfile Subscriber

```Dockerfile
FROM golang

WORKDIR /Server2

COPY . /Server2

RUN go get -u github.com/segmentio/kafka-go
RUN go get -u github.com/tidwall/sjson

CMD [ "go", "run", "Subscriber.go"]
```