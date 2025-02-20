
import { useEffect, useState } from 'react';

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export const StockTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>([
    // شركات مصرية
    { symbol: "COMI", price: 42.50, change: 1.2 },
    { symbol: "SWDY", price: 12.85, change: -0.5 },
    { symbol: "TMGH", price: 8.95, change: 2.1 },
    { symbol: "EAST", price: 15.30, change: 0.8 },
    { symbol: "MFPC", price: 75.20, change: 1.5 },
    { symbol: "ESRS", price: 22.45, change: -1.2 },
    { symbol: "ABUK", price: 28.90, change: 2.3 },
    { symbol: "QNBA", price: 18.75, change: 0.9 },
    { symbol: "ALCN", price: 9.65, change: -0.3 },
    { symbol: "ETEL", price: 24.80, change: 1.7 },
    { symbol: "EGAL", price: 16.40, change: -0.8 },
    { symbol: "IRON", price: 5.90, change: 0.4 },
    { symbol: "EFIH", price: 19.85, change: 1.2 },
    { symbol: "GPPL", price: 7.30, change: -0.6 },
    { symbol: "HRHO", price: 14.95, change: 2.5 },
    { symbol: "JUFO", price: 8.75, change: 0.7 },
    { symbol: "EMFD", price: 2.85, change: -0.2 },
    { symbol: "EKHO", price: 1.25, change: 0.1 },
    { symbol: "FAIT", price: 13.60, change: 1.4 },
    { symbol: "HDBK", price: 31.20, change: -1.5 },
    { symbol: "FWRY", price: 4.15, change: 0.3 },
    { symbol: "CIEB", price: 9.90, change: -0.4 },
    { symbol: "ADIB", price: 17.85, change: 1.6 },
    { symbol: "OCDI", price: 15.70, change: 0.8 },
    { symbol: "ORHD", price: 5.45, change: -0.3 },
    { symbol: "EFID", price: 12.30, change: 1.1 },
    { symbol: "SKPC", price: 8.95, change: -0.7 },
    { symbol: "PHDC", price: 1.95, change: 0.2 },
    { symbol: "EXPA", price: 14.80, change: -1.1 },
    { symbol: "AUTO", price: 4.65, change: 0.5 },
    { symbol: "EGCH", price: 6.35, change: -0.4 },
    { symbol: "TAQA", price: 2.75, change: 0.3 },
    { symbol: "ORWE", price: 7.85, change: -0.6 },
    { symbol: "BTFH", price: 3.45, change: 0.2 },
    { symbol: "HELI", price: 5.90, change: -0.3 },
    { symbol: "EGSA", price: 11.25, change: 0.8 },
    { symbol: "CANA", price: 8.15, change: -0.5 },
    { symbol: "CLHO", price: 4.95, change: 0.4 },
    { symbol: "MTIE", price: 3.85, change: -0.2 },
    { symbol: "MHOT", price: 24.60, change: 1.3 },
    { symbol: "EFIC", price: 12.75, change: -0.8 },
    { symbol: "RAYA", price: 3.25, change: 0.1 },
    { symbol: "AMOC", price: 4.55, change: -0.3 },
    { symbol: "SAUD", price: 15.85, change: 0.9 },
    { symbol: "ELEC", price: 2.15, change: -0.1 },
    { symbol: "MNHD", price: 3.95, change: 0.3 },
    { symbol: "CIRA", price: 11.75, change: -0.6 },
    { symbol: "TALM", price: 4.25, change: 0.2 },
    { symbol: "SCEM", price: 6.85, change: -0.4 },
    { symbol: "MOIL", price: 0.85, change: 0.1 },
    { symbol: "ARCC", price: 5.15, change: -0.3 },
    { symbol: "SPHT", price: 1.65, change: 0.1 },
    { symbol: "POUL", price: 2.95, change: -0.2 },
    { symbol: "SCTS", price: 8.45, change: 0.5 },
    
    // شركات عالمية
    { symbol: "AAPL", price: 173.50, change: 2.5 },
    { symbol: "MSFT", price: 384.20, change: -1.2 },
    { symbol: "GOOGL", price: 142.65, change: 1.8 },
    { symbol: "AMZN", price: 156.80, change: 3.2 },
    { symbol: "TSLA", price: 238.45, change: -2.1 },
    { symbol: "META", price: 326.85, change: 1.7 },
    { symbol: "NVDA", price: 445.20, change: 2.8 },
    { symbol: "ARAMCO", price: 32.15, change: -0.8 },
    { symbol: "QNB", price: 18.45, change: 1.2 },
    { symbol: "FAB", price: 15.30, change: -0.5 }
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
