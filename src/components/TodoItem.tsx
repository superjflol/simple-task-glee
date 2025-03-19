
import React from 'react';
import { useTodo, Todo, TodoCategory } from '@/contexts/TodoContext';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { X, ArrowRight } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodo, deleteTodo, moveTodo } = useTodo();

  const handleToggle = () => {
    toggleTodo(todo.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTodo(todo.id);
  };

  const handleMove = (category: TodoCategory) => {
    if (category !== todo.category) {
      moveTodo(todo.id, category);
    }
  };

  return (
    <li 
      className={cn(
        "task-item px-4 py-3 rounded-lg bg-white dark:bg-gray-900 shadow-soft flex items-center gap-3 select-none",
        todo.completed && "opacity-70"
      )}
    >
      <Checkbox 
        checked={todo.completed}
        onCheckedChange={handleToggle}
        className="checkbox-animation h-5 w-5 rounded-full border-2 border-primary/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary data-[state=checked]:text-primary-foreground"
      />
      
      <span 
        className={cn(
          "flex-1 text-base font-normal leading-tight",
          todo.completed && "line-through text-muted-foreground"
        )}
      >
        {todo.text}
      </span>

      <div className="flex items-center gap-1">
        {todo.category !== 'completed' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                <ArrowRight className="h-4 w-4" />
                <span className="sr-only">Move</span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 glass-morph animate-scale-in">
              {todo.category !== 'today' && (
                <DropdownMenuItem onClick={() => handleMove('today')}>
                  Move to Today
                </DropdownMenuItem>
              )}
              {todo.category !== 'upcoming' && (
                <DropdownMenuItem onClick={() => handleMove('upcoming')}>
                  Move to Upcoming
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        
        <button 
          onClick={handleDelete}
          className="p-1.5 rounded-full text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Delete</span>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
