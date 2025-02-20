
import { useEffect, useState } from 'react';

interface Stock {
  symbol: string;
  price: number;
  change: number;
}

export const StockTicker = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const apiKey = 'f2d390029a6b4178819b60dc1064a23c';
        const symbols = ['IBM', 'AAPL', 'MSFT', 'GOOGL']; // يمكنك تحديث هذه القائمة بالرموز المطلوبة

        const promises = symbols.map(async (symbol) => {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
          );
          const data = await response.json();
          
          if (data['Global Quote']) {
            return {
              symbol,
              price: parseFloat(data['Global Quote']['05. price']),
              change: parseFloat(data['Global Quote']['09. change'])
            };
          }
          return null;
        });

        const stockData = (await Promise.all(promises)).filter(Boolean) as Stock[];
        if (stockData.length > 0) {
          setStocks(stockData);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
    const interval = setInterval(fetchStockData, 60000); // تحديث كل دقيقة
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full overflow-hidden border-b border-accent/20 bg-stone-950 hover:bg-stone-800 my-0 py-0">
      <div 
        className="whitespace-nowrap inline-block" 
        style={{
          direction: 'rtl',
          animation: 'ticker 30s linear infinite', // إبطاء الحركة إلى 30 ثانية
        }}
      >
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
