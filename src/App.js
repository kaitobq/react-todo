import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import userEvent from "@testing-library/user-event";

function App() {
  const [todos, setTodos] = useState([]); //useStateフックスはtodosが更新されると画面が再レンダリング（画面の更新）される。

  const todoNameRef = useRef();

  const handleAddTodo = () => {
    //タスクを追加する。
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), name: name, completed: false }];
    });
    todoNameRef.current.value = null;
  };

  const toggleTodo = (id) => {
    //todosをnewTodosにコピー
    const newTodos = [...todos];
    //引数のidを持つtodoをtodoに格納
    const todo = newTodos.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setTodos(newTodos);
  };

  const handleClear = () => {
    const newTodos = todos.filter((todo) => !todo.completed);
    setTodos(newTodos);
  };

  return (
    <>
      {/* ↓todosという名前でtodosをTodoListコンポーネントに渡す。 */}
      <TodoList todos={todos} toggleTodo={toggleTodo} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>タスクを追加</button>
      <button onClick={handleClear}>完了したタスクの削除</button>
      {/* todo.completedがfalseのものの数 */}
      <div>残りのタスク:{todos.filter((todo) => !todo.completed).length}</div>
    </>
  );
}
//return する値はdivタグかJSX fragment <> ... </> に囲まれている必要がある。

export default App;
