# MongoDB

## Run MongoDB Manually

run this command in the terminal:

```
docker run -d -p 27017:27017 -v mongo_exam4_volume:/data/db --name=monogo_exam4 mongo:latest
```

## Run MongoDB with Node

first go to the backend folder

```
cd /backend
```

then run this command:

```
npm run db
```
