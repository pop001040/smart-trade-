
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  TrendingDown, 
  Globe, 
  DollarSign 
} from "lucide-react";

const markets = [
  {
    name: "مصر",
    index: "EGX30",
    value: 24150.32,
    change: 1.2,
    volume: "234.5M"
  },
  {
    name: "السعودية",
    index: "TASI",
    value: 11234.56,
    change: -0.8,
    volume: "456.2M"
  },
  {
    name: "الكويت",
    index: "BKP",
    value: 7823.45,
    change: 0.5,
    volume: "123.4M"
  },
  {
    name: "قطر",
    index: "QSE",
    value: 10456.78,
    change: 1.5,
    volume: "345.6M"
  }
];

export const Markets = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {markets.map((market, index) => (
        <Card
          key={index}
          className="p-6 backdrop-blur-sm bg-white/10 border border-white/20 hover:border-accent/50 transition-all duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">{market.name}</h3>
            <Globe className="text-accent/80 w-5 h-5" />
          </div>
          <div className="space-y-2">
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
            <div className="flex items-center text-sm text-gray-400">
              <DollarSign className="w-4 h-4 mr-1" />
              Volume: {market.volume}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
