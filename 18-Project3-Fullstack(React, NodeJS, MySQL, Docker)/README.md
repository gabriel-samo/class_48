# Vacation-Project

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Running the project](#running-the-project)

## About

This project is a vacation project that follows the MERN stack.

- For the frontend I used React created with Vite, Redux for state management, and TailwindCSS and Flowbite, Flowbite-React for the styling.
- For the backend I used Node.js, Express.
- For the database I Used MySQL.
- Also, I used Docker to containerize the project.

It allows you to to register, login, follow and unfollow vacations, filter them by all vacations, followed vacations, vacations that not started yet and vacations that active now.

If you are are and Admin you can add, update and delete vacations.

## Installation

### Installation

The repository is a Docker project, so you need to have Docker installed on your machine.

Also, you need ".env" files in the root folder and in the backend folder. see folder structure below.

```
.
├── backend
   ├── api.env
├── frontend
├── docker-compose.yml
├── mysql.env
├── phpMyAdmin.env
```

### below is the content of the .env files:

backend/api.env

```
TZ='YOUR_TIME_ZONE' # e.g. Asia/Jerusalem

NODE_ENV=development # should be development
PORT=8000 # should be 8000
HOST=localhost # should be localhost

DB_HOST=mysql_db # should be mysql_db as in docker-compose.yml
DB_USER='YOUR_DB_USER'
DB_PASSWORD='YOUR_DB_PASSWORD'
DB_SCHEMA=project-3-db # should be project-3-db as in docker-compose.yml
DB_PORT=3306 # should be 3306

JWT_SECRET='YOUR_JWT_SECRET'
JWT_EXPIRES='YOUR_JWT_EXPIRES' # e.g. 1d
```

mysql.env

```
MYSQL_ROOT_PASSWORD='YOUR_MYSQL_ROOT_PASSWORD' # should be the same as in api.env
MYSQL_DATABASE=project-3-db # should be project-3-db as in docker-compose.yml
MYSQL_USER='YOUR_MYSQL_USER' # should be the same as in api.env
MYSQL_PASSWORD='YOUR_MYSQL_PASSWORD' # should be the same as in api.env
```

phpMyAdmin.env

```
PMA_HOST=mysql_db # should be mysql_db as in docker-compose.yml
PMA_PORT=3306 # should be 3306
PMA_USER='YOUR_MYSQL_USER' # should be the same as in api.env
PMA_PASSWORD='YOUR_MYSQL_PASSWORD' # should be the same as in api.env
```

## Running the project

First of all you need to have Docker Desktop installed on your machine.
you can download it from [here](https://www.docker.com/products/docker-desktop/).

And then you can run the project either in watch mode where you can edit the code and the changes will be reflected automatically, or in production mode where the code is compiled and the changes are not reflected automatically.

### Docker command

after creating the .env files, run the following command to run the project:

```
docker-compose -f compose.yml up
```

running the project in watch mode:

```
docker-compose -f compose.yml watch
```

stopping the project:

```
docker-compose -f compose.yml stop
```
