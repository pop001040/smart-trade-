import { StockTicker } from "@/components/StockTicker";
import { Markets } from "@/components/Markets";
import { StockChart } from "@/components/StockChart";
import { NewsSection } from "@/components/NewsSection";
import { TopStocks } from "@/components/TopStocks";
import { ChatBot } from "@/components/ChatBot";
import { GlobalMarkets } from "@/components/GlobalMarkets";
const Index = () => {
  return <div className="min-h-screen bg-gradient-to-br from-primary via-primary/95 to-primary/90 rounded">
      {/* Hero Section with Video */}
      <div className="relative w-full bg-black text-center py-0 overflow-hidden">
        <video className="w-full object-cover min-h-[600px]" autoPlay muted loop playsInline>
          <source src="/widgets-main-video.a3d7152108cd9db92d6c.webm" type="video/webm" />
          يرجى تحديث متصفحك لدعم تشغيل الفيديو
        </video>
      </div>

      {/* Title Section */}
      <div className="bg-gradient-to-r from-primary to-primary/90 py-12 text-center">
        <h1 className="text-6xl font-bold mb-4 text-amber-500">
          <span className="text-amber-500">خبير التداول</span> الذكي
        </h1>
        <p className="text-2xl max-w-3xl mx-auto text-stone-50">
          منصة التداول الأولى للأسواق العالمية والعربية
        </p>
      </div>

      <div className="container mx-auto px-4 py-8">
        <StockTicker />
        <TopStocks />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 my-0">
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