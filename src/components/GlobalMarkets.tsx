
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Search, Bell, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

const sectors = ["التكنولوجيا", "البنوك", "الطاقة", "الصناعة", "الاتصالات", "العقارات", "الرعاية الصحية", "السلع الاستهلاكية"];
const forexData = {
  eurusd: {
    name: "EUR/USD",
    change: "+0.32%"
  },
  gbpusd: {
    name: "GBP/USD",
    change: "-0.15%"
  },
  usdjpy: {
    name: "USD/JPY",
    change: "+0.45%"
  }
};

type StockDataPoint = {
  date: string;
  value: number;
};

const generateStockData = (days: number): StockDataPoint[] => {
  return Array.from({
    length: days
  }, (_, i) => ({
    date: `2024/${Math.floor(i / 30) + 1}/${i % 30 + 1}`,
    value: Math.random() * 100 + 20
  }));
};

type Company = {
  id: number;
  symbol: string;
  name: string;
  sector: string;
  price: number;
  change: number;
  volume: number;
  stockData: StockDataPoint[];
  current_price: number;
  lowest_price: number;
  highest_price: number;
  rsi: number;
  macd: number;
  volatility: number;
  pe_ratio: number;
  market_cap: number;
  dividend_yield: number;
};

const generateCompanies = (count: number, marketPrefix: string): Company[] => {
  return Array.from({
    length: count
  }, (_, i) => ({
    id: i + 1,
    symbol: `${marketPrefix}${(i + 1).toString().padStart(4, '0')}`,
    name: `شركة ${marketPrefix} ${i + 1}`,
    sector: sectors[i % sectors.length],
    price: Math.round(Math.random() * 1000 * 100) / 100,
    change: Math.round((Math.random() * 10 - 5) * 100) / 100,
    volume: Math.round(Math.random() * 1000000),
    stockData: generateStockData(30),
    current_price: Math.round(Math.random() * 100),
    lowest_price: Math.round(Math.random() * 50),
    highest_price: Math.round(Math.random() * 150),
    rsi: Math.round(Math.random() * 100),
    macd: Math.round(Math.random() * 100 - 50) / 10,
    volatility: Math.round(Math.random() * 100) / 100,
    pe_ratio: Math.round(Math.random() * 50 * 100) / 100,
    market_cap: Math.round(Math.random() * 1000000000000),
    dividend_yield: Math.round(Math.random() * 10 * 100) / 100
  }));
};

const markets = {
  egypt: {
    name: "السوق المصري",
    companies: generateCompanies(150, "EGY")
  },
  saudi: {
    name: "السوق السعودي",
    companies: generateCompanies(150, "SAU")
  },
  kuwait: {
    name: "السوق الكويتي",
    companies: generateCompanies(150, "KWT")
  },
  oman: {
    name: "بورصة عمان",
    companies: generateCompanies(150, "OMN")
  },
  qatar: {
    name: "السوق القطري",
    companies: generateCompanies(150, "QAT")
  }
};

const StockPriceChart = ({ data }: { data: StockDataPoint[] }) => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="date" stroke="#ffffff60" tick={{ fill: '#ffffff80' }} />
          <YAxis stroke="#ffffff60" tick={{ fill: '#ffffff80' }} />
          <Tooltip contentStyle={{
            backgroundColor: '#1f2937',
            border: '1px solid #4b5563',
            borderRadius: '8px'
          }} />
          <Area type="monotone" dataKey="value" stroke="#4F46E5" fill="url(#colorValue)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GlobalMarkets = () => {
  const [selectedMarket, setSelectedMarket] = useState("egypt");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(markets.egypt.companies[0]);

  const filteredCompanies = markets[selectedMarket as keyof typeof markets].companies.filter(company => 
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    company.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {selectedCompany && (
        <Card className="backdrop-blur bg-[#2D3047] text-white">
          <CardHeader className="border-b border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{selectedCompany.name}</h2>
                <p className="text-sm text-gray-400">{selectedCompany.symbol}</p>
              </div>
              <Button variant="outline" size="icon" onClick={() => {}}>
                <Bell className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 gap-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <h3 className="text-lg mb-4">التحليل الفني</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">MACD</span>
                      <span>{selectedCompany.macd}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">RSI</span>
                      <span>{selectedCompany.rsi}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">مضاعف الربحية</span>
                      <span>{selectedCompany.pe_ratio}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">التقلب</span>
                      <span>{selectedCompany.volatility}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-4">تفاصيل السهم</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">السعر الحالي</span>
                      <span className="font-bold">${selectedCompany.current_price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">التغير</span>
                      <span className={selectedCompany.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {selectedCompany.change >= 0 ? '+' : ''}{selectedCompany.change}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">أعلى سعر</span>
                      <span>${selectedCompany.highest_price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">أدنى سعر</span>
                      <span>${selectedCompany.lowest_price}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-4">معلومات إضافية</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">القيمة السوقية</span>
                      <span>${(selectedCompany.market_cap / 1e9).toFixed(2)}B</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">عائد التوزيعات</span>
                      <span>{selectedCompany.dividend_yield}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">حجم التداول</span>
                      <span>{selectedCompany.volume.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-4">محاكي التداول</h3>
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input 
                      type="number"
                      className="bg-[#1F2937] border-gray-700 text-white"
                      placeholder="السعر"
                    />
                  </div>
                  <div className="flex-1">
                    <Input 
                      type="number"
                      className="bg-[#1F2937] border-gray-700 text-white"
                      placeholder="الكمية"
                    />
                  </div>
                  <Button className="bg-yellow-500 text-black hover:bg-yellow-600">
                    محاكاة تداول
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-lg mb-4">تنبيهات الأسعار</h3>
                <div className="flex gap-4">
                  <Input 
                    type="number"
                    className="bg-[#1F2937] border-gray-700 text-white"
                    placeholder="السعر المستهدف"
                  />
                  <Button variant="outline">
                    تعيين تنبيه
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="backdrop-blur bg-zinc-950">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex flex-wrap gap-2">
              {Object.entries(markets).map(([key, market]) => (
                <Button
                  key={key}
                  variant={selectedMarket === key ? "default" : "outline"}
                  onClick={() => {
                    setSelectedMarket(key);
                    setSelectedCompany(market.companies[0]);
                  }}
                >
                  {market.name}
                </Button>
              ))}
            </div>
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
          <div className="space-y-4">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                className="p-4 bg-white/5 rounded cursor-pointer hover:bg-white/10 transition-colors"
                onClick={() => setSelectedCompany(company)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">{company.symbol}</h4>
                    <p className="text-sm text-gray-400">{company.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white">${company.price}</p>
                    <p className={`text-sm ${company.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {company.change >= 0 ? '+' : ''}{company.change}%
                      {company.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 inline ml-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 inline ml-1" />
                      )}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
