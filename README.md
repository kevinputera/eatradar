# EatRadar

## Setup

Ensure Docker is installed and `docker-compose` is working.

Run `docker-compose up` in the project root. This will launch `postgres` and `pgweb` docker images. The `postgres` image is loaded with PostGIS extension.
* `postgres` uses port `5432`.
* `pgweb` uses port `8081` (go to `localhost:8081` to use).

Docker-compose might fail on the first run due to `pgweb` not being able to connect to the database. However, subsequent runs should work.

## npm scripts

### server

`npm run start` or `npm start` - launch app.js

`npm run start-dev` launch app.js using nodemon(auto refresh)

`npm run init-table` recreate database tables *WARNING: This will erase all existing data*

`npm run seed` seed the tables with some fake data

### client
