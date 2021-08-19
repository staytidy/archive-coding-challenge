# Coding Challenge: Archive Server

A small server for the optional GraphQL part of the Coding Challenge.

## Run

Install the dependencies

```
yarn install
```

Run the server
```
yarn start
```

The server is trying to connect on port `4000` right now.
This example does not allow binding of another port.

## Inspect the schema

The schema can be found in the `index.js`. 
If you want a more interactive view: start the server and visit [Apollo Studio](https://studio.apollographql.com/sandbox/explorer). This website will connect to your local running server and allows an interactive exploration of the queries and mutations.
