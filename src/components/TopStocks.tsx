
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const topStocks = [
  { 
    symbol: "TSLA",
    name: "Tesla Inc",
    price: 238.45,
    change: 3.2,
    marketCap: "750B",
    volume: "12.5M",
    sector: "السيارات الكهربائية"
  },
  { 
    symbol: "AAPL",
    name: "Apple Inc",
    price: 173.50,
    change: 2.5,
    marketCap: "2.8T",
    volume: "45.2M",
    sector: "التكنولوجيا"
  },
  { 
    symbol: "ARAMCO",
    name: "Saudi Aramco",
    price: 32.15,
    change: 1.8,
    marketCap: "2.1T",
    volume: "15.3M",
    sector: "الطاقة"
  },
  { 
    symbol: "QNB",
    name: "Qatar National Bank",
    price: 185.60,
    change: 1.5,
    marketCap: "180B",
    volume: "8.2M",
    sector: "البنوك"
  },
  { 
    symbol: "SABIC",
    name: "SABIC",
    price: 95.20,
    change: -1.2,
    marketCap: "285B",
    volume: "10.1M",
    sector: "المواد الأساسية"
  }
];

export const TopStocks = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
      <CardHeader>
        <h3 className="text-xl font-bold text-white">أفضل الأسهم أداءً</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {topStocks.map((stock, index) => (
            <div
              key={index}
              className="p-4 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-right">
                  <h4 className="text-white font-medium">{stock.symbol}</h4>
                  <p className="text-sm text-gray-400">{stock.name}</p>
                  <p className="text-xs text-accent/80 mt-1">{stock.sector}</p>
                </div>
                <div className="text-left">
                  <p className="text-white font-medium">${stock.price.toFixed(2)}</p>
                  <span className={`flex items-center ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-4 h-4 ml-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 ml-1" />
                    )}
                    {stock.change > 0 ? '+' : ''}{stock.change}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-2 pt-2 border-t border-white/10">
                <span>القيمة السوقية: {stock.marketCap}</span>
                <span>حجم التداول: {stock.volume}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
