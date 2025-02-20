
import { useEffect, useState } from 'react';

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export const StockTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    {
      symbol: "AAPL",
      price: 173.50,
      change: 2.5
    },
    {
      symbol: "MSFT",
      price: 384.20,
      change: -1.2
    },
    {
      symbol: "GOOGL",
      price: 142.65,
      change: 1.8
    },
    {
      symbol: "AMZN",
      price: 156.80,
      change: 3.2
    },
    {
      symbol: "TSLA",
      price: 238.45,
      change: -2.1
    },
    {
      symbol: "META",
      price: 326.85,
      change: 1.7
    },
    {
      symbol: "NVDA",
      price: 445.20,
      change: 2.8
    },
    {
      symbol: "ARAMCO",
      price: 32.15,
      change: -0.8
    },
    {
      symbol: "QNB",
      price: 18.45,
      change: 1.2
    },
    {
      symbol: "FAB",
      price: 15.30,
      change: -0.5
    }
  ]);

  return (
    <div className="w-full overflow-hidden border-b border-accent/20 bg-stone-950 hover:bg-stone-800 my-0 py-0">
      <div className="animate-ticker-rtl whitespace-nowrap inline-block" style={{
        direction: 'rtl'
      }}>
        {stocks.map((stock, index) => (
          <span key={index} className="inline-block px-4 text-sm font-medium">
            <span className="text-white">{stock.symbol}</span>
            <span className={`mr-2 ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              ${stock.price.toFixed(2)} ({stock.change > 0 ? '+' : ''}{stock.change}%)
            </span>
          </span>
        ))}
      </div>
    </div>
  );
};
