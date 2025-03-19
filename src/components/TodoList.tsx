import React from 'react';
import { useTodo, TodoCategory } from '@/contexts/TodoContext';
import TodoItem from './TodoItem';
import { AnimatePresence, motion } from 'framer-motion';

interface TodoListProps {
  category: TodoCategory;
}

const TodoList: React.FC<TodoListProps> = ({ category }) => {
  const { todos } = useTodo();
  
  const filteredTodos = todos.filter(todo => todo.category === category);

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-12 animate-fade-in">
        <p className="text-muted-foreground text-sm">No tasks in this category</p>
      </div>
    );
  }

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    // Sort completed items at the bottom for Today and Upcoming
    if (category !== 'completed') {
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }
    }
    // Otherwise sort by creation date (newest first)
    return b.createdAt - a.createdAt;
  });

  return (
    <ul className="space-y-3 min-h-[200px] animate-fade-in">
      {sortedTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
};

export default TodoList;
