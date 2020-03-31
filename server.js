const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require("express-graphql");
const mongoose = require("mongoose");
const cors = require("cors");

//import Schema and Resolver
const graphQLSchema = require("./graphql/schema/index");
const graphQLResolvers = require("./graphql/resolvers/index");

const app = express();

app.use(bodyParser.json())

//for CORS
app.use(cors())

//graphQL entry
app.use("/graphql", graphqlHttp({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true
}));

const port = 8000;

mongoose
.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-ruxnn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`)
.then(()=> {
  //start up server if success
  app.listen(process.env.PORT || port, () => {
    console.log("Express Server is up and running");
  })
})
.catch(err=>console.log(err));