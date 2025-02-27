## Run locally

```sh
npx ts-node src/index.ts
```

## Build Docker image

```sh
docker build -t xp-node-graphql .
```

## Run the Docker container

```sh
docker run -p 3000:3000 xp-node-graphql-mongo
```

## List Docker containers

```sh
docker ps -a
```

## Update Helm charts

```sh
helm repo update
```

## Install MongoDB Helm chart with custom values

```sh
helm install xp-node-graphql-mongo-mongodb -f dev-mongodb-values.yaml oci://registry-1.docker.io/bitnamicharts/mongodb
```

## Delete Helm chart

```sh
helm uninstall xp-node-graphql-mongo-mongodb
```

## Connect to DB

To retrieve the MongoDB root password from the Kubernetes secret and set it as an environment variable, run the following command:

```sh
$MONGODB_ROOT_PASSWORD = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String((kubectl get secret --namespace default xp-node-graphql-mongo-mongodb -o jsonpath="{.data.mongodb-root-password}")))

kubectl get svc xp-node-graphql-mongo-mongodb

kubectl run --namespace default xp-node-graphql-mongo-mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:8.0.3-debian-12-r0 --command -- bash
```

## Converting strings

```sh
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('secret-value'))

[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('mongodb://mongodb-username:mongodb-password@xp-node-graphql-mongo-mongodb.default.svc.cluster.local:27017/mongodb-database'))

[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('encoded-value'))
```

## Connect to admin inside MongoDB client inside pod

```sh
mongosh --host '10.110.221.154' -u 'mongodb' -p 'mongodb' --authenticationDatabase 'mongodb'
```

## Insert data through mongosh

```sh
use mongodb
```

```sh
db.runCommand({connectionStatus:1})
```

```sh
# 3. Insert a single document
db.users.insertOne({ username: "john_doe", email: "john@example.com" })

# 4. Insert multiple documents
db.users.insertMany([
  { username: "jane_doe",  email: "jane@example.com" },
  { username: "alex_smith", email: "alex@example.com" }
])
```

## Read data through mongosh

```sh
db.users.find().pretty()
```

```sh
[
  {
    _id: ObjectId('67be9f544896e7d362fe6911'),
    id: 1,
    name: 'alpha',
    email: 'bravo'
  },
  {
    _id: ObjectId('67be9f7e4896e7d362fe6912'),
    id: 2,
    name: 'charlie',
    email: 'delta'
  }
]
```

## Delete resoruces

```sh
kubectl delete service xp-flask-service
kubectl delete deployment xp-flask-deployment
kubectl delete secrets xp-node-graphql-mongo-secrets
kubectl delete pvc xp-mongodb
```

### POST request to GraphQL endpoint (http://localhost:3000/graphql)

```sh
{ "query": "{ getUser(id: \"67be9f544896e7d362fe6911\") { id name email } }" }
```