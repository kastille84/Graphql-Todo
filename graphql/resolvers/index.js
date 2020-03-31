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
  },
  createTodo: async (args) => {
    try {
      const todo = new Todo({
        text: args.text
      });

      const result = await todo.save();

      return {...result._doc};
    }catch(err) {
      throw err;
    }
  },
  completeTodo: async(args) => {
    try{
      const todo = await Todo.findById(args.todoId);
      if (!todo) {
        throw new Error("This todo does not exist")
      }
      todo.completed = !todo.completed;
      const completedTodo = await todo.save();
      return completedTodo;
    }catch(err) {
      throw err;
    }
  },
  deleteTodo: async(args) => {
    try {
      const todo = await Todo.findByIdAndDelete(args.todoId);
      console.log("todo",  todo)
      return todo;
    }catch(err) {
      throw err;
    }
  }
}

module.exports = rootResolver;