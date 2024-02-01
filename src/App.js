import { useState, useRef } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import userEvent from "@testing-library/user-event";

function App() {
  //todos更新で画面が再レンダリング
  const [todos, setTodos] = useState([]);

  //refオブジェクトを作成
  //44行目でref属性に指定しDOMを参照
  const todoNameRef = useRef();

  //タスクを追加するコンポーネント
  const handleAddTodo = () => {
    // ref=todoNameRef(入力欄)の値
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
    // completed=falseのtodoを取り出す
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
