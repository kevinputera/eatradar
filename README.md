# EatRadar

## Setup

### Posgres and pgweb(Postgres web viewer)

Ensure Docker is installed and `docker-compose` is working.

Run `docker-compose up` in the project root. This will launch `postgres` and `pgweb` docker images. The `postgres` image is loaded with PostGIS extension.
* `postgres` uses port `5432`.
* `pgweb` uses port `8081` (go to `localhost:8081` to use).

Docker-compose might fail on the first run due to `pgweb` not being able to connect to the database. However, subsequent runs should work.

### server

Run `npm run table`, `npm run seed`, and `npm run view` in that sequence if you haven't or if you want to refresh the database.

Run `npm start` to launch the server. Server listens on port `5000`.

### client

Since the app is still in development, run `npm start` to start React's development server.

Go to your browser and visit `localhost:3000` to view the app.


## npm scripts

### server

`npm run start` or `npm start` - launch server(app.js)

`npm run start-dev` - launch server(app.js) using nodemon(auto refresh)

`npm run table` - recreate database tables *WARNING: This will erase all existing data*

`npm run view` - recreate database materialized view responsible for storing restaurant name lexemes. Read more here <http://rachbelaid.com/postgres-full-text-search-is-good-enough/>

`npm run seed` - seed the tables with data from `foodEstablishmentsParsed.txt`

### client

`npm start` - launch React's development server