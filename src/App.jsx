import AppName from "./components/AppName";
import AddTodo from "./components/AddTodo";
import TodoItems from "./components/TodoItems";
import { useState, useEffect } from "react"; // import useEffect
import WelcomeMessage from "./components/WelcomeMessage";
import "./App.css";

function App() {
  // Load from localStorage if available
  const getLocalTodos = () => {
    const saved = localStorage.getItem("todoItems");
    return saved ? JSON.parse(saved) : [];
  };

  const [todoItems, setTodoItems] = useState(getLocalTodos);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem("todoItems", JSON.stringify(todoItems));
  }, [todoItems]);

  const handleNewItem = (itemName, itemDueDate) => {
    const newTodoItems = [
      ...todoItems,
      { name: itemName, dueDate: itemDueDate },
    ];
    setTodoItems(newTodoItems);
  };

  const handleDeleteItem = (todoItemName) => {
    const newTodoItems = todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newTodoItems);
  };

  return (
    <center className="todo-container">
      <AppName />
      <AddTodo onNewItem={handleNewItem} />
      {todoItems.length === 0 && <WelcomeMessage />}
      <TodoItems
        todoItems={todoItems}
        onDeleteClick={handleDeleteItem}
      />
    </center>
  );
}

export default App;
