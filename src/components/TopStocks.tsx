
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

const topStocks = [
  { symbol: "TSLA", name: "Tesla Inc", price: 238.45, change: 3.2 },
  { symbol: "AAPL", name: "Apple Inc", price: 173.50, change: 2.5 },
  { symbol: "NVDA", name: "NVIDIA Corp", price: 481.20, change: 2.1 },
  { symbol: "META", name: "Meta Platforms", price: 334.15, change: 1.8 },
  { symbol: "GOOGL", name: "Alphabet Inc", price: 142.65, change: 1.5 },
  { symbol: "MSFT", name: "Microsoft Corp", price: 384.20, change: -1.2 },
  { symbol: "AMZN", name: "Amazon.com Inc", price: 156.80, change: -1.5 },
  { symbol: "NFLX", name: "Netflix Inc", price: 485.30, change: -1.8 },
  { symbol: "AMD", name: "AMD Inc", price: 142.90, change: -2.0 },
  { symbol: "INTC", name: "Intel Corp", price: 43.75, change: -2.3 }
];

export const TopStocks = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
      <CardHeader>
        <h3 className="text-xl font-bold text-white">أفضل 10 أسهم عالمية</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {topStocks.map((stock, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <span className="text-gray-400 text-sm">{index + 1}</span>
                <div className="text-right">
                  <h4 className="text-white font-medium">{stock.symbol}</h4>
                  <p className="text-sm text-gray-400">{stock.name}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-white font-medium mr-2">
                  ${stock.price.toFixed(2)}
                </span>
                <span className={`flex items-center ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {stock.change >= 0 ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {stock.change > 0 ? '+' : ''}{stock.change}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
