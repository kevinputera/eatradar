# EatRadar

EatRadar aims to solve food exploration's dull routine of:

- Visiting multiple food review sites to compare ratings and reviews,
- Switching between maps and food review sites to locate the restaurant,
- Opening multiple tabs of food blogs, food testimonial sites, and others to get professional reviews of foods,
- (And perhaps more)

By serving the users a map-based restaurant info aggregator application.

In short, it:
- Aggregates ratings and reviews from a couple of renowned food review sites (currently Yelp and Google Places, can be extended),
- Blog posts from food blogging sites (all blog posts are indexed in a search engine, thus no need for manual mapping of blog posts -> restaurant),
- Provides a map that is plotted with restaurant locations.

Here's the screen recording!

![EatRadar GIF](eatradar.gif)

*(Apologies for the lossy GIF file!)*

## Developing

First of, make a copy of the `.env.example` file in the root directory and rename it `.env`.

Ensure [Docker](https://www.docker.com/get-started) is installed and `docker-compose` is working.

Run `docker-compose up` in the project root. This will launch `postgres`, `pgweb`, `elasticsearch` and `kibana`
docker images. The `postgres` image is loaded with [PostGIS](https://postgis.net/) extension, used for geospatial querying.

- `postgres`([learn more](https://www.postgresql.org/docs/)) runs on port `5432`.
- `pgweb`([learn more](https://github.com/sosedoff/pgweb)) runs port `8081` (go to `localhost:8081` to use).
- `elasticsearch`([learn more](https://www.elastic.co/guide/en/elasticsearch/reference/current/getting-started.html)) runs on port `9200`.
- `kibana`([learn more](https://www.elastic.co/guide/en/kibana/current/getting-started.html)) runs on port `5601` (go to `localhost:5601` to use).

Docker-compose might fail on the first run due to `pgweb` not being able to connect to the database. However, subsequent runs should work.

### eatradar-server(the `server` directory)

*(All the instructions below assume the root directory to be `server`)*

Run `npm run table` and `npm run seed` in that sequence if you haven't or if you want to refresh the database.

Ensure that there are `blogposts.json` and `foodEstablishmentsParsed.json` files in the `scripts` directory.
`blogposts.example.json` and `foodEstablishmentsParsed.example.json` are provided as templates.
Raw data for `foodEstablishmentsParsed.json` can be obtained [here](https://data.gov.sg/dataset/eating-establishments),
while the processing of the raw data can be done by the `foodEstablishmentsRawParse.js` script.

Create a `.env` file in the root directory, and copy the `.env.example` template.
Some of the environment variables are already provided, while others need to be filled in(such as the Google Places API key and the Yelp API key).

Run `npm start` to launch the server. Server listens on port `5000`.

Run `npm test` to run the test suites.

### eatradar-client(the `client` directory)

*(All the instructions below assume the root directory to be `client`)*

Create a `.env` file in the root directory, and copy the `.env.example` template.
Some of the environment variables are already provided, while others need to be filled in(such as the Mapbox token).

Run `npm start` to launch [Create React App](https://facebook.github.io/create-react-app/docs/getting-started)'s development server.

Run `npm test` to run the test suites.

Go to your browser and visit `localhost:3000` to view the app.
