import React, { useState } from "react";

import "./AddTodo.css";

const AddTodo = ({ onTodoSubmit }) => {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);

  const validate = text => {
    //reset errors
    setErrors([])
    //validate
    if (text === "") {
      const newErrors = [...errors, "Todo cannot be empty"];
      setErrors(newErrors);
      return;
    }
    //clear out input
    setText("")
    //call submit handler
    onTodoSubmit(text);
  };

  return (
    <div className="add-todo form-container">
      <form className="form">
        {errors.length > 0 &&
          errors.map((error, idx) => (
            <p key={idx} style={{ textAlign: "center", color:'red' }}>
              {error}
            </p>
          ))}
        <div className="form-control">
          <label htmlFor="todo_text">What would you like to do?</label>
          <input
            placeholder="i.e. Wash Car or Study for test"
            id="todo_text"
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className="form-actions">
          <button
            className="btn"
            onClick={e => {
              e.preventDefault();
              validate(text);
            }}
          >
            Add Todo
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTodo;
