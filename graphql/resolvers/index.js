const Todo = require("../../models/todo");

const rootResolver = {
  todos: async () => {
    try {
      const todos = await Todo.find();
      console.log('todos', todos)
      return todos.map(todo => {
        return {
          ...todo._doc
        }
      })
    }catch(err) {
      throw err;
    }
  }
  // createTodo: async () => {

  // }
}

module.exports = rootResolver;