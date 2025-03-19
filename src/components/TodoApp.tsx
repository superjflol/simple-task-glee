
import React from 'react';
import { TodoProvider, useTodo } from '@/contexts/TodoContext';
import TodoInput from './TodoInput';
import TodoCategories from './TodoCategory';
import TodoList from './TodoList';

const TodoContent = () => {
  const { activeCategory } = useTodo();
  
  const categories = [
    { id: 'today', label: 'Today' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Completed' }
  ];

  return (
    <div className="todo-container px-4 py-8 md:py-12">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-medium mb-1 animate-fade-in">Simple Todo</h1>
        <p className="text-muted-foreground text-sm animate-fade-in">Focus on what matters most</p>
      </header>
      
      <TodoCategories categories={categories} />
      
      {activeCategory !== 'completed' && <TodoInput />}
      
      <TodoList category={activeCategory} />
    </div>
  );
};

const TodoApp: React.FC = () => {
  return (
    <TodoProvider>
      <TodoContent />
    </TodoProvider>
  );
};

export default TodoApp;
