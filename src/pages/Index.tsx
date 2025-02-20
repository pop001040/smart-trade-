
import { Markets } from "@/components/Markets"
import { GlobalMarkets } from "@/components/GlobalMarkets"
import { StockChart } from "@/components/StockChart"
import { NewsSection } from "@/components/NewsSection"
import { ChatBot } from "@/components/ChatBot"
import { GoogleApiSettings } from "@/components/GoogleApiSettings"

export default function Index() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Markets />
        <GlobalMarkets />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StockChart />
        <NewsSection />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ChatBot />
        <GoogleApiSettings />
      </div>
    </div>
  )
}
