import React, {Component} from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import gql from 'graphql-tag';
import {Mutation, Query} from 'react-apollo';
import './App.css';
import AddTodo from './components/AddTodo';
import TodoItem from './components/TodoItem';

const client = new ApolloClient({
  uri: "/graphql"
});

const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    createTodo(text: $text) {
      _id
      text
      completed
    }
  }
`
const GET_TODOS = gql`
  query GetTodos {
    todos {
      _id
      text
      completed
    }
  }
`
class App extends Component {


  render() {
    return (
      <ApolloProvider client={client}>      
        <div className="App">
          <header className="App__title">
            <h1>Todos App</h1>
            <p>Organization at your fingertips</p>
          </header>
          {/* Add Todo*/}
          <Mutation 
            mutation={ADD_TODO}
            //update query
            update={(cache, {data: {createTodo}}) => {
              const {todos} = cache.readQuery({query: GET_TODOS});
              cache.writeQuery({
                query: GET_TODOS,
                data: {todos: todos.concat([createTodo])}
              });
            }}
          >
            {(createTodo, {loading, error, data}) => {
              console.log('data',data);
              return <AddTodo 
                onTodoSubmit={(text)=>{
                  createTodo({variables:{text:text}});
                }}
              />

            }}
          </Mutation>
          {/* Todos List*/}
          <section className="todos__list">
            <Query query={GET_TODOS}>
              {({loading, error, data})=> {
                if(loading) return <h4>Loading...</h4>;
                if(error) console.log(error);

                return <React.Fragment>
                  {
                    (data.todos.length ===0)? 
                    <p style={{textAlign: 'center'}}>No Todos. Please Add a todo</p>
                    :
                    data.todos.map(todo => {
                    return <TodoItem key={todo._id} todo={todo} />
                  })
                }
                </React.Fragment>;
              }}
            </Query>
          </section>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
