
import { useEffect, useState } from 'react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const arabicStocks = [
  { symbol: "ARAMCO", name: "أرامكو السعودية", price: 32.15, change: 1.8 },
  { symbol: "SABIC", name: "سابك", price: 95.20, change: -1.2 },
  { symbol: "QNB", name: "بنك قطر الوطني", price: 185.60, change: 1.5 },
  { symbol: "FAB", name: "بنك أبوظبي الأول", price: 75.30, change: 2.1 },
  { symbol: "EMAAR", name: "إعمار العقارية", price: 45.80, change: -0.8 },
  { symbol: "STC", name: "الاتصالات السعودية", price: 98.40, change: 0.9 }
];

export const StockTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>(arabicStocks);

  useEffect(() => {
    const interval = setInterval(() => {
      // Update stock prices randomly for simulation
      setStocks(prevStocks => prevStocks.map(stock => ({
        ...stock,
        price: stock.price * (1 + (Math.random() - 0.5) * 0.02),
        change: stock.change + (Math.random() - 0.5)
      })));
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden border-b border-accent/20 bg-stone-950 hover:bg-stone-800 my-0 py-2">
      <div 
        className="whitespace-nowrap inline-block" 
        style={{
          direction: 'rtl',
          animation: 'ticker 30s linear infinite'
        }}
      >
        {stocks.map((stock, index) => (
          <span key={index} className="inline-block px-4 text-sm font-medium">
            <span className="text-white">{stock.name}</span>
            <span className={`mr-2 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${stock.price.toFixed(2)} ({stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)}%)
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
