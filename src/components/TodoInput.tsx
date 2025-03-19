
import React, { useState } from 'react';
import { useTodo } from '@/contexts/TodoContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

const TodoInput: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      addTodo(inputValue);
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 flex w-full gap-2 animate-fade-in">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="What needs to be done?"
        className="todo-input flex-1 h-12 text-base px-4 bg-white dark:bg-gray-950 border-0 shadow-soft focus-visible:ring-1 focus-visible:ring-opacity-50"
        autoFocus
      />
      <Button 
        type="submit" 
        size="icon" 
        className="h-12 w-12 rounded-full bg-primary text-primary-foreground shadow-soft hover:bg-primary/90 transition-all duration-300"
      >
        <Plus className="h-5 w-5" />
        <span className="sr-only">Add task</span>
      </Button>
    </form>
  );
};

export default TodoInput;
