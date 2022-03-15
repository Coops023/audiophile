# Audiophile eccommerce app

Audiophile is a full-stack eccomerce app for audio equipment. The design was created by Front-end mentor and built by myself Cooper Bjokelund using React, Redux in the front-end and node, express and mongoDB in the back-end.

### Table of contents

- [Project structure](#Project-structure)
- [API endpoints](#API-endpoints)
- [Links](#Links)

## Project structure

- client/src:
  - component : React components for the user interface
  - pages
  - redux
- index.js : point of entry, also known as server.
- routes : includes the API end points definition
- models : Mongoose database Schemas

## API endpoints

- `GET /all-products ` - get all products from the database
- `GET /all-speakers ` - get all the speakers from the database.
- `GET /all-earphones ` - get all the earphones from the database.
- `GET /all-headphones ` - get all the headphones from the database.
- `GET /product/:id ` - get a specific product by id from the database.
- `POST /stripe/charge` - creates a new stripe payment.

## Links

- Heroku deployment : https://audiophile-app.herokuapp.com
