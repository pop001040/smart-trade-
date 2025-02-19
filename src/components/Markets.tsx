import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Globe, DollarSign } from "lucide-react";
const markets = [{
  name: "مصر",
  index: "EGX30",
  value: 24150.32,
  change: 1.2,
  volume: "234.5M",
  sectors: {
    banks: "+2.1%",
    energy: "-0.8%",
    tech: "+1.5%"
  }
}, {
  name: "السعودية",
  index: "TASI",
  value: 11234.56,
  change: -0.8,
  volume: "456.2M",
  sectors: {
    banks: "+1.2%",
    energy: "+2.3%",
    tech: "-1.1%"
  }
}, {
  name: "الكويت",
  index: "BKP",
  value: 7823.45,
  change: 0.5,
  volume: "123.4M",
  sectors: {
    banks: "+0.7%",
    energy: "+1.1%",
    tech: "+0.9%"
  }
}, {
  name: "قطر",
  index: "QSE",
  value: 10456.78,
  change: 1.5,
  volume: "345.6M",
  sectors: {
    banks: "+1.8%",
    energy: "+2.1%",
    tech: "-0.5%"
  }
}, {
  name: "عُمان",
  index: "MSM30",
  value: 4567.89,
  change: 0.3,
  volume: "89.2M",
  sectors: {
    banks: "+0.5%",
    energy: "+0.8%",
    tech: "+0.2%"
  }
}, {
  name: "العملات الرقمية",
  index: "CRYPTO",
  value: 45678.90,
  change: 2.8,
  volume: "789.3M",
  sectors: {
    bitcoin: "+3.2%",
    ethereum: "+2.5%",
    binance: "+1.9%"
  }
}];
export const Markets = () => {
  return <div className="">
      {markets.map((market, index) => <Card key={index} className="p-6 backdrop-blur-sm bg-white/10 border border-white/20 hover:border-accent/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{market.name}</h3>
            <Globe className="text-accent/80 w-5 h-5" />
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400">{market.index}</p>
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">
                  {market.value.toLocaleString()}
                </span>
                <span className={`flex items-center ${market.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {market.change >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {market.change}%
                </span>
              </div>
            </div>
            
            <div className="border-t border-white/10 pt-3">
              <p className="text-sm text-gray-400 mb-2">أداء القطاعات</p>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(market.sectors).map(([sector, value]) => <div key={sector} className="text-sm">
                    <span className="text-gray-400">{sector}</span>
                    <span className={`mr-2 ${value.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                      {value}
                    </span>
                  </div>)}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-400">
              <DollarSign className="w-4 h-4 ml-1" />
              حجم التداول: {market.volume}
            </div>
          </div>
        </Card>)}
    </div>;
};