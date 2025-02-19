
import { StockTicker } from "@/components/StockTicker";
import { Markets } from "@/components/Markets";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90">
      <header className="w-full py-6 px-4 text-center border-b border-accent/20">
        <h1 className="text-4xl font-bold text-white mb-2 animate-fadeIn">
          <span className="text-accent">خبير التداول</span> الذكي
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          منصة التداول الأولى للأسواق العالمية والعربية
        </p>
      </header>
      
      <StockTicker />
      
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-right">الأسواق المالية</h2>
          <Markets />
        </section>
      </main>
    </div>
  );
};

export default Index;
