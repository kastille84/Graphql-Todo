import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import "./TodoItem.css";

const COMPLETE_TODO = gql`
  mutation CompleteTodo($todoId: ID!) {
    completeTodo(todoId: $todoId) {
      _id
      text
      completed
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos {
      _id
      text
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DeleteTodo($todoId: ID!) {
    deleteTodo(todoId: $todoId) {
      _id
    }
  }
`;

const TodoItem = ({ todo }) => {
  return (
    <React.Fragment>
      <Mutation mutation={COMPLETE_TODO}>
        {(completeTodo, { loading, error, data }) => {
          return (
            <div className="todo-item">
              <span className="todo-item__text">{todo.text}</span>
              <span>
                <button
                  className={`btn todo-item__completed ${
                    todo.completed ? "completed" : "not-completed"
                  }`}
                  onClick={() => {
                    completeTodo({ variables: { todoId: todo._id } });
                  }}
                >
                  {todo.completed ? "Complete" : "Not Complete"}
                </button>
                <React.Fragment>
                  <Mutation
                    mutation={DELETE_TODO}
                    //update query
                    update={(cache, { data: { deleteTodo } }) => {
                      const { todos } = cache.readQuery({ query: GET_TODOS });
                      cache.writeQuery({
                        query: GET_TODOS,
                        data: {
                          todos: todos.filter(
                            todo => todo._id !== deleteTodo._id
                          )
                        }
                      });
                    }}
                  >
                    {(deleteTodo, { loading, error, data }) => {
                      return (
                        <button
                          className="todo-item__close"
                          onClick={() =>
                            deleteTodo({ variables: { todoId: todo._id } })
                          }
                        >
                          X
                        </button>
                      );
                    }}
                  </Mutation>
                </React.Fragment>
              </span>
            </div>
          );
        }}
      </Mutation>
    </React.Fragment>
  );
};

export default TodoItem;
