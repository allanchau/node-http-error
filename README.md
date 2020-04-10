# node-http-error

[![npm](https://img.shields.io/npm/v/allanchau-http-error.svg)](https://www.npmjs.com/package/allanchau-http-error)
![Report coverage](https://github.com/allanchau/node-http-error/workflows/Report%20coverage/badge.svg)
![Test](https://github.com/allanchau/node-http-error/workflows/Test/badge.svg)

Simple Express HTTP error response middleware.

## Features

- Simple API error responses.

## Installation

This package is available on [NPM](https://www.npmjs.com/package/allanchau-http-error):

```shell
$ yarn add allanchau-http-error
```

## Usage

A simple example:

```javascript
// App.
const app = require("express");
const httpError = require("allanchau-http-error");

app.use(httpError());

app.get("/stringexample", (req, res, next) => {
  return res.error("Oops something went wrong.");
});

// Returns
// {
//   "code": "400",
//   "message": "Oops something went wrong.",
// }

app.get("/errorobjectexample", (req, res, next) => {
  return res.error(new Error("Oops something went wrong."));
});

// Returns the same thing
// {
//   "code": "400",
//   "message": "Oops something went wrong.",
// }

app.get("/customerrorexample", (req, res, next) => {
  return res.error({
    code: "ERRBADREQUEST",
    message: "Oops something went wrong.",
  });
});

// Returns
// {
//   "code": "ERRBADREQUEST",
//   "message": "Oops something went wrong.",
// }
```

You can also provide some defaults for the route.

```js
app.use(
  httpError({
    defaultCode: "ERRNOTAUTHORIZED",
    defaultMessage: "The user is not authorized.",
    defaultStatusCode: 401,
  })
);

app.get("/stringexample", (req, res, next) => {
  return res.error();
});

// Returns
// {
//   "code": "ERRNOTAUTHORIZED",
//   "message": "The user is not authorized.",
// }
```
