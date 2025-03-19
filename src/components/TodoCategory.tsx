
import { useTodo, TodoCategory } from '@/contexts/TodoContext';
import { cn } from '@/lib/utils';

interface TodoCategoryProps {
  categories: {
    id: TodoCategory;
    label: string;
  }[];
}

const TodoCategories: React.FC<TodoCategoryProps> = ({ categories }) => {
  const { activeCategory, setActiveCategory, todos } = useTodo();

  const getCategoryCount = (category: TodoCategory) => {
    return todos.filter(todo => todo.category === category).length;
  };

  return (
    <div className="flex justify-center mb-8 animate-fade-in">
      <div className="flex gap-1 p-1 rounded-lg bg-secondary/50 backdrop-blur-sm">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={cn(
              "category-tab relative px-4 py-2 rounded-md text-sm font-medium transition-colors",
              activeCategory === category.id
                ? "bg-white dark:bg-gray-800 text-primary shadow-sm"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/80"
            )}
          >
            {category.label}
            {getCategoryCount(category.id) > 0 && (
              <span className="ml-1.5 inline-flex items-center justify-center h-5 min-w-5 px-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                {getCategoryCount(category.id)}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TodoCategories;
