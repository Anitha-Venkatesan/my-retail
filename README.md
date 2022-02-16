# my-retail

## Description

RESTful service that can retrieve product and price details by ID for myRetail company.

## Technologies

1. NestJS
2. MongoDB
3. Javascript and Typescript

## Installation

### Install Node JS
1. Install Node JS (https://nodejs.org/en/download/)

### Install Mongo DB

1. Run `docker pull mongo`
2. Run `docker run --name my-retail-db -p -27017:27017 mongo`

### Install Application

1. Clone `git clone git@github.com:Anitha-Venkatesan/my-retail.git`
2. Goto `cd my-retail`
3. Run `npm install` 
4. Run `npm run start:dev`
5. Open http://localhost:3000/api/ for swagger API document.

### Run Test

1. Run `npm run test`

Make sure `DATABASE_HOST` and `DATABASE_PORT` properties in `.env` file matches the mongodb host and port which is created using docker.

## Assumptions

1. During GET, when price information is not present in database then I am returning only `id` and `name`.
2. During PUT, when price information is present in database I will update the data.
3. During PUT, when price information is not present in database I will create a new record in database.
4. During PUT, when redsky say the item is not valid then I am not creating or updating the price information in database.

## Future Improvements

1. Create a secured Mongo DB with credentials.
2. Enable log for debugging.
3. Cache redsky request, since name is always same for the ID.
4. Enable CI/CD
5. Authenticate the end points.
