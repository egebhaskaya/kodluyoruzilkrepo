import React from "react";
import Todo from "./Todo";

const ToDoList = ({ todos, toggleTodo }) => {
  let newTodos = [...todos];
  return newTodos.map((todo) => {
    return <Todo key={todo.id} todo={todo} toggleTodo={toggleTodo} />;
  });
};

export default ToDoList;
