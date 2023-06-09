![Node.js CI](https://github.com/mucahitnezir/express-starter/workflows/Node.js%20CI/badge.svg?branch=master)

# Express Starter

This project was created to be a template when starting a new [express.js](https://github.com/expressjs/express) project.

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run?git_repo=https://github.com/mucahitnezir/express-starter.git)

## Features

1. ES6+ features with babel (including **es6 import/export** feature).
2. SQL database implementation with **[Sequelize v6](https://sequelize.org/docs/v6/)** for **postgres dialect** (you can change postgresql anytime).
3. Compatible with [12 factor app](https://12factor.net/).
4. Including authentication system with rest api endpoints.
5. Linting with eslint (airbnb config).
6. Implemented nodemailer. If you are in development or test mode, you use test smtp account. In production mode, you use real smtp server.
For more info, browse `src/helpers/mail.js` file.
7. Production ready Dockerfile.
8. Test cases written with mocha and chai.
9. Implemented [sentry](https://sentry.io) error tracking.
10. Api documentation with [swagger](https://swagger.io/).
11. Records are never deleted from the database. They are marked as deleted.
12. Cache management with [redis](https://redis.io/).
13. One click deploy to [Google Cloud Run](https://cloud.google.com/run).

## Api Documentation
Api documentation of this project was created with [swagger](https://swagger.io/).  
You can access the swagger configuration file from [this link](https://app.swaggerhub.com/apis/mucahitnezir/express-starter/).  
You can also discover the interactive documentation by going to `/docs` when you run the application.

## Database Selection
This project is compatible with sql-based databases. You can change default dialect (postgres) in anytime.
To do this, firstly select your database from the table below.
Modify `dialect` property in `src/config/sequelize.js` and install required npm package(s) for this database.

For more info, visit [sequelize docs](https://sequelize.org/docs/v6/other-topics/dialect-specific-things/)

**Note:** The default and active database is postgresql.
If you want to use postgresql in your project, you don't need to make any changes.

| Database | Dialect | Required npm Package(s) |
| --- | --- | --- |
| MySQL | mysql | `yarn add mysql2` |
| MariaDB | mariadb | `yarn add mariadb` |
| PostgreSQL | postgres | `yarn add pg pg-hstore` |
| SQLite | sqlite | `yarn add sqlite3` |
| Microsoft SQL Server | mssql | `yarn add tedious` |

### Usage of sequelize-cli
With sequelize-cli package, you can manage model, migration and seed files.
You can find more information with [document](https://sequelize.org/docs/v6/other-topics/migrations/). 

## Installation
1. Firstly, you have to install npm packages with ``yarn install`` command.
2. Create empty postgres database.
3. Create **.env** file by copying *.env.sample* file in **root directory**.
4. Modify .env file.
5. Use `yarn run db:migrate` command to create database tables.
6. Finally, your app will run successfully with ``yarn run start:dev`` command.

## Authentication Endpoints

| Route | HTTP Verb | Request Body | Description |
| --- | --- | --- | --- |
| /auth/register | `POST` | {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com", "password": "123456"} | Create new user. |
| /auth/login | `POST` | {"email": "john.doe@example.com", "password": "123456"} | Login endpoint. |
| /auth/me | `GET` | Empty | Fetch current user. |
| /auth/me | `PUT` | {"firstName": "John", "lastName": "Doe", "email": "john.doe@example.com"} | Update current user. |
| /auth/me | `DELETE` | Empty | Delete current user. |
| /auth/me/password | `PUT` | {"current": "current-password", "password": "new-password"} | Update password of current user. |

## Contribution
Anyone interested in the project can contribute to this repository. To do this, first fork the repository.
Then make the changes in your repository. Finally, send a pull request to this repository.

## License
**Express Starter** is licensed under the **MIT license**.
