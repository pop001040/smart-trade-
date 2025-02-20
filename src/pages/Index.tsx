import { StockTicker } from "@/components/StockTicker";
import { Markets } from "@/components/Markets";
import { StockChart } from "@/components/StockChart";
import { NewsSection } from "@/components/NewsSection";
import { TopStocks } from "@/components/TopStocks";
import { ChatBot } from "@/components/ChatBot";
import { GlobalMarkets } from "@/components/GlobalMarkets";
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 rounded">
      <header className="w-full py-6 px-4 text-center border-b border-accent/20 bg-lime-600 hover:bg-lime-500 rounded-sm">
        <h1 className="font-bold mb-2 animate-fadeIn text-5xl text-zinc-50 my-0 mx-0">
          <span className="text-gray-50">خبير التداول</span> الذكي
        </h1>
        <p className="max-w-2xl mx-auto text-blue-600">
          منصة التداول الأولى للأسواق العالمية والعربية
        </p>
      </header>

      <div className="container mx-auto px-4 py-8">
        <TopStocks />
        <StockTicker />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          <div className="lg:col-span-2">
            <section className="mb-8 px-0 py-0">
              <h2 className="text-2xl font-bold text-white mb-6 text-right">الأسواق العالمية والعربية</h2>
              <GlobalMarkets />
            </section>
          </div>
          
          <div className="space-y-6 mx-[3px] px-0 py-0 my-0">
            <ChatBot />
            <NewsSection />
          </div>
        </div>
      </div>
    </div>;
};
export default Index;