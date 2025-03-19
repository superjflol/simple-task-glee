
import TodoApp from "@/components/TodoApp";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { toast } = useToast();
  
  useEffect(() => {
    toast({
      title: "Welcome to Simple Todo",
      description: "Your minimalist companion for maximum productivity.",
      duration: 3000,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/50 flex flex-col items-center justify-center">
      <main className="w-full max-w-3xl mx-auto px-4">
        <TodoApp />
      </main>
    </div>
  );
};

export default Index;
