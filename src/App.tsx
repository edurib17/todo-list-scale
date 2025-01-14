import { useState, useEffect, useMemo } from "react";

import { ITodo } from "./global/types/todo.types";
import { FilterType } from "./global/types/filter.types";
import { Filter, TodoForm, TodoList } from "./components";

import { Container, GlobalStyle } from "./styles";
import Alert from "./components/Alert";

export default function App() {
  const [todos, setTodos] = useState<Array<ITodo>>([]);
  const [filter, setFilter] = useState<FilterType>("all");
  const [alert, setAlert] = useState<{
    color: string;
    text: string;
    duration: number;
  } | null>(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos") || "")
      : [];
    setTodos(storedTodos);

    const storedFilter = localStorage.getItem("filter") || "all";
    setFilter(storedFilter as FilterType);
  }, []);

  function addTodo(title: string, description: string) {
    if (todos.some((todo) => todo?.title?.toLowerCase() === title.toLowerCase())) {
      showAlert("orange", "A tarefa com o mesmo título já existe", 3000);
      return;
    }
    const updatedTodos = [
      ...todos,
      { id: Date.now(), title, description, completed: false },
    ];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showAlert("green", "Tarefa adicionada com sucesso!", 3000);
  }

  function editTodo(id: number, newTitle: string, newDescription?: string) {
    if (todos.some((todo) => todo.title?.toLowerCase() === newTitle?.toLowerCase() && todo.id !== id)) {
      showAlert("orange", "A tarefa com o mesmo título já existe", 3000);
      return;
    }

    const updatedTodos = todos.map((todo) =>
      todo.id === id
        ? { ...todo, title: newTitle, description: newDescription }
        : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showAlert("green", "Tarefa atualizada com sucesso!", 3000);
  }

  function toggleComplete(id: number) {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showAlert("green", "Tarefa atualizada com sucesso!", 3000);
  }

  function removeTodo(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos );
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showAlert("green", "Lista atualizada com sucesso!", 3000);
  }

  function showAlert(color: string, text: string, duration: number) {
    setAlert({ color, text, duration });
    setTimeout(() => setAlert(null), duration);
  }
  
  function handlerFilter(filter: FilterType): void{
    localStorage.setItem("filter", filter);
    setFilter(filter)
  }

  const filteredTodos = useMemo(() => {
    if (filter === "title") {
      return [...todos].sort((a, b) => a.title.localeCompare(b.title));
    } else {
      return todos.filter((todo) => {
        if (filter === "completed") return todo.completed;
        if (filter === "incomplete") return !todo.completed;
        return true;
      });
    }
  }, [todos, filter]);

  return (
    <>
      {alert && (
        <Alert
          color={alert.color}
          text={alert.text}
          duration={alert.duration}
        />
      )}
      <Container>
        <GlobalStyle />
        <h1>Todo List</h1>
        <TodoForm addTodo={addTodo} />
        <Filter filter={filter} setFilter={handlerFilter} />
        <TodoList
          todos={filteredTodos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
          editTodo={editTodo}
        />
      </Container>
    </>
  );
}
