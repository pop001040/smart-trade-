
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface StockData {
  id: number;
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap: number;
}

const markets = {
  egypt: {
    name: "السوق المصري",
    symbols: ["COMI.CASE", "HRHO.CASE", "TMGH.CASE", "SWDY.CASE", "EAST.CASE"]
  },
  saudi: {
    name: "السوق السعودي",
    symbols: ["2222.SAU", "1180.SAU", "1120.SAU", "7010.SAU", "2010.SAU"]
  },
  kuwait: {
    name: "السوق الكويتي",
    symbols: ["AUB.KW", "NBK.KW", "KFH.KW", "ZAIN.KW", "AGLT.KW"]
  }
};

export const GlobalMarkets = () => {
  const [selectedMarket, setSelectedMarket] = useState("egypt");
  const [searchQuery, setSearchQuery] = useState("");
  const [stockData, setStockData] = useState<Record<string, StockData[]>>({});
  const [selectedStock, setSelectedStock] = useState<StockData | null>(null);
  const [historicalData, setHistoricalData] = useState<any[]>([]);

  const fetchStockData = async (market: string) => {
    try {
      const apiKey = 'NTAOZH53OKFRUMLM';
      const symbols = markets[market as keyof typeof markets].symbols;
      
      const promises = symbols.map(async (symbol, index) => {
        const response = await fetch(
          `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`
        );
        const data = await response.json();
        
        if (data['Global Quote']) {
          return {
            id: index + 1,
            symbol: symbol,
            name: symbol,
            price: parseFloat(data['Global Quote']['05. price']),
            change: parseFloat(data['Global Quote']['09. change']),
            volume: parseInt(data['Global Quote']['06. volume']),
            marketCap: 0 // Alpha Vantage doesn't provide market cap in GLOBAL_QUOTE
          };
        }
        return null;
      });

      const results = (await Promise.all(promises)).filter(Boolean) as StockData[];
      setStockData(prev => ({ ...prev, [market]: results }));
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const fetchHistoricalData = async (symbol: string) => {
    try {
      const apiKey = 'NTAOZH53OKFRUMLM';
      const response = await fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apiKey}`
      );
      const data = await response.json();
      
      if (data['Time Series (Daily)']) {
        const chartData = Object.entries(data['Time Series (Daily)']).map(([date, values]: [string, any]) => ({
          date,
          value: parseFloat(values['4. close'])
        })).reverse();
        setHistoricalData(chartData);
      }
    } catch (error) {
      console.error('Error fetching historical data:', error);
    }
  };

  useEffect(() => {
    if (selectedMarket) {
      fetchStockData(selectedMarket);
    }
  }, [selectedMarket]);

  useEffect(() => {
    if (selectedStock) {
      fetchHistoricalData(selectedStock.symbol);
    }
  }, [selectedStock]);

  const filteredStocks = stockData[selectedMarket]?.filter(stock =>
    stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur bg-zinc-950">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Select
              value={selectedMarket}
              onValueChange={setSelectedMarket}
            >
              <SelectTrigger className="w-[200px] bg-zinc-800 text-white border-zinc-700">
                <SelectValue placeholder="اختر السوق" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-white border-zinc-700">
                {Object.entries(markets).map(([key, market]) => (
                  <SelectItem
                    key={key}
                    value={key}
                    className="hover:bg-zinc-700"
                  >
                    {market.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                className="pl-8"
                placeholder="ابحث عن شركة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Select
            value={selectedStock?.symbol || ''}
            onValueChange={(value) => {
              const stock = filteredStocks.find(s => s.symbol === value);
              if (stock) {
                setSelectedStock(stock);
              }
            }}
          >
            <SelectTrigger className="w-full bg-zinc-800 text-white border-zinc-700">
              <SelectValue placeholder="اختر شركة" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white border-zinc-700 max-h-[300px]">
              {filteredStocks.map(stock => (
                <SelectItem
                  key={stock.symbol}
                  value={stock.symbol}
                  className="hover:bg-zinc-700"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{stock.name}</span>
                    <span className={stock.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      ${stock.price.toFixed(2)} ({stock.change >= 0 ? '+' : ''}{stock.change}%)
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {selectedStock && historicalData.length > 0 && (
        <Card className="backdrop-blur bg-zinc-950">
          <CardHeader>
            <h3 className="text-xl font-bold text-white">{selectedStock.name}</h3>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={historicalData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="date" stroke="#ffffff60" />
                  <YAxis stroke="#ffffff60" />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#4F46E5"
                    fill="url(#colorValue)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
