import React from "react";
import Todo from "./Todo";

// ここから
const TodoList = ({ todos, toggleTodo }) => {
  return todos.map((todo) => (
    <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo} />
  )); //map関数は配列の中身を1つずつ変数todoに渡し、Todoコンポーネントに渡す。
};
// ここまでがコンポーネント

export default TodoList;
