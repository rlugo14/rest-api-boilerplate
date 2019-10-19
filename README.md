# Rest API Boilerplate (Node.js, Express and Typescript)[![Build Status](https://travis-ci.com/rlugo14/rest-api-boilerplate.svg?branch=master)](https://travis-ci.com/rlugo14/rest-api-boilerplate)

This Rest API boiler plate was created using different "often used" technologies for example:

-   Node.js
-   Express
-   Typescript
-   Typegoose and Mongoose (ODM "Object Document Mapper")

**_TODO:_** Create generic repository pattern and remove last dependencies

-   MongoDB

I followed [this tutorial](https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/) in order to understand the functionality and logic of an Express Node Typescript application.

## The application is divided by

-   Routes
-   Controllers
-   Models

That was intended to follow the MVC model represented in the following image:

---

![Express Tutorial Part 4: Routes and controllers](https://mdn.mozillademos.org/files/14456/MVC%20Express.png "MVC Model")

image source: [developer.mozilla.org](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/routes "Express Tutorial Part 4: Routes and controllers
")

---

### Start Application

**Install dependencies using npm :**

`npm install`

**Create .env file in `src` with following variables :**

-   `MONGO_USER`
-   `MONGO_PASSWORD`
-   `DB_CONNECTION_STRING`
-   `DB_SERVER`
-   `PORT`
-   `JWT_SECRET`

**_Example :_**

Mongodb connection URI:

`mongodb://<mongodb_password>:<password>@mongodb0.example.com:27017/admin`

    MONGO_USER=<database_password>
    MONGO_PASSWORD=<database_password>
    DB_CONNECTION_STRING=mongodb://
    DB_SERVER=@mongodb0.example.com:27017/admin
    PORT=<desired_port>
    JWT=<desired_jwt_secret>

### Available scripts in `package.json`

#### _Start server using nodemon as filewatcher on .ts files (with node command)_

`npm run dev`

#### _Start server without filewatcher (with node command)_

`npm run dev:start`

#### _Build application_

`npm run build`

#### _Clean application_

`npm run clean`

#### _Execute linter on application_

`npm run lint`

#### _Compile application_

`npm run tsc`

#### _Start server using nodemon as filewatcher on .ts files (with ts-node command)_

`npm run dev:typescript`
