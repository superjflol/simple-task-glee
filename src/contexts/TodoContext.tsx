
import React, { createContext, useState, useContext, useEffect } from 'react';

export type TodoCategory = 'today' | 'upcoming' | 'completed';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: TodoCategory;
  createdAt: number;
}

interface TodoContextType {
  todos: Todo[];
  activeCategory: TodoCategory;
  setActiveCategory: (category: TodoCategory) => void;
  addTodo: (text: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  moveTodo: (id: string, category: TodoCategory) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  
  const [activeCategory, setActiveCategory] = useState<TodoCategory>('today');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      category: activeCategory === 'completed' ? 'today' : activeCategory,
      createdAt: Date.now()
    };
    
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id 
          ? { 
              ...todo, 
              completed: !todo.completed,
              category: !todo.completed ? 'completed' : todo.category === 'completed' ? 'today' : todo.category
            } 
          : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const moveTodo = (id: string, category: TodoCategory) => {
    setTodos(prevTodos => 
      prevTodos.map(todo => 
        todo.id === id 
          ? { ...todo, category } 
          : todo
      )
    );
  };

  return (
    <TodoContext.Provider value={{ 
      todos, 
      activeCategory, 
      setActiveCategory, 
      addTodo, 
      toggleTodo, 
      deleteTodo,
      moveTodo
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};
