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
docker run -p 3000:3000 xp-micro-node-graphql
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
helm install xp-micro-node-graphql-mongodb -f dev-mongodb-values.yaml oci://registry-1.docker.io/bitnamicharts/mongodb
```

## Delete Helm chart

```sh
helm uninstall xp-micro-node-graphql-mongodb
```

## Connect to DB

To retrieve the MongoDB root password from the Kubernetes secret and set it as an environment variable, run the following command:

```sh
$MONGODB_ROOT_PASSWORD = [System.Text.Encoding]::UTF8.GetString([System.Convert]::FromBase64String((kubectl get secret --namespace default xp-micro-node-graphql-mongodb -o jsonpath="{.data.mongodb-root-password}")))

kubectl get svc xp-micro-node-graphql-mongodb

kubectl run --namespace default xp-micro-node-graphql-mongodb-client --rm --tty -i --restart='Never' --env="MONGODB_ROOT_PASSWORD=$MONGODB_ROOT_PASSWORD" --image docker.io/bitnami/mongodb:8.0.3-debian-12-r0 --command -- bash
```

## Connect to admin inside MongoDB client inside pod

```sh
mongosh --host '10.102.124.38' -u 'mongodb' -p 'mongodb' --authenticationDatabase 'mongodb'
```

## Delete resoruces

```sh
kubectl delete service xp-flask-service
kubectl delete deployment xp-flask-deployment
kubectl delete secrets dev-secrets
kubectl delete pvc xp-mongodb
```