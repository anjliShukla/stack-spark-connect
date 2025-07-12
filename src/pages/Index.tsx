import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { QuestionFeed } from "@/components/QuestionFeed";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <Sidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            <QuestionFeed />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
