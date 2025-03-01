###### Other useful commands during development

```sh
# Run your non-containerized application
npx ts-node src/index.ts

# Run the docker container locally
docker run -p 3000:3000 xp-node-graphql-mongo

# List running containers
docker ps

# Stop this container
docker stop <container_id_or_name>

# Encode string value in Powershell
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('secret-value'))

# Decode string value in Powershell
[System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String('encoded-value'))

# List running Kubernetes pods
kubectl get pods

# Inspect pod logs
kubectl describe pod <pod-name>
```

###### 1. Containerize the application

Run this in the same folder where the Dockerfile is

```sh
docker build -t xp-node-graphql-mongo .
```

###### 2. Setup MongoDB

Charts from Bitnami is needed for MongoDB

```sh
helm install xp-mongodb -f dev-mongodb-config.yaml oci://registry-1.docker.io/bitnamicharts/mongodb
```

To retrieve the MongoDB root password from the Kubernetes secret and set it as an environment variable, run the following command:

```sh
$MONGODB_ROOT_PASSWORD = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String((kubectl get secret --namespace default xp-mongodb -o jsonpath="{.data.mongodb-root-password}")))

kubectl get svc xp-mongodb

kubectl run --namespace default xp-mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:8.0.3-debian-12-r0 --command -- bash
```

Get into mongosh using the ip from the xp-mongodb svc 

```sh
mongosh --host '10.107.249.24' -u 'mongodb-username' -p 'mongodb-password' --authenticationDatabase 'mongodb-database'
```

Use MongoDB database

```sh
use mongodb-database
```

```sh
db.runCommand({connectionStatus:1})
```

Insert Data

```sh
# 3. Insert a single document
db.users.insertOne({ name: "john_doe", email: "john@example.com" })

# 4. Insert multiple documents
db.users.insertMany([
  { name: "jane_doe",  email: "jane@example.com" },
  { name: "alex_smith", email: "alex@example.com" }
])
```

Read data

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

To exit 

```sh
mongodb-database> exit
```

Set MONGO_URI secret in dev-users-secrets.yaml with the value below. Note where you are using the mongo username and mongo password

```sh
[Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes('mongodb://mongodb-username:mongodb-password@xp-mongodb.default.svc.cluster.local:27017/mongodb-database'))
```

###### 4. Deploy k8s objects

Create the service to allow network traffic into the cluster

```sh
kubectl apply -f dev-users-service.yaml
```

Create the secrets which will be injected into the deployment

```sh
kubectl apply -f dev-users-secrets.yaml
```

Create the deployment which actually starts the application

```sh
kubectl apply -f dev-users-deployment.yaml
```

###### 5. Use service

Fetch all users

```json
{
  "query": "query { users { name email } }"
}
```

Read users based on params

```json
{
  "query": "query { users(limit: 2, skip: 0) { id name email } }"
}
```

Create user

```json
{
  "query": "mutation CreateUser($name: String!, $email: String!) { createUser(name: $name, email: $email) { id name email } }",
  "variables": {
    "name": "Alice",
    "email": "alice@example.com"
  }
}
```