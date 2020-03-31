const {buildSchema} = require("graphql");

module.exports = buildSchema(`
  type Todo {
    _id: ID!
    text: String!
    completed: Boolean!
  }


  type RootQuery {
    todos: [Todo!]!
  }

  type RootMutation {
    createTodo(text:String!):Todo!
  }

  schema {
    query: RootQuery
    mutation: RootMutation
  }
`)