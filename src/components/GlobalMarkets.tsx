import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Search, Bell } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const sectors = ["التكنولوجيا", "البنوك", "الطاقة", "الصناعة", "الاتصالات", "العقارات", "الرعاية الصحية", "السلع الاستهلاكية"];

const cryptoData = {
  bitcoin: { name: "Bitcoin", change: "+3.2%" },
  ethereum: { name: "Ethereum", change: "+2.5%" },
  binance: { name: "Binance", change: "+1.9%" }
};

type StockDataPoint = {
  date: string;
  value: number;
};

const generateStockData = (days: number): StockDataPoint[] => {
  return Array.from({ length: days }, (_, i) => ({
    date: `2024/${Math.floor(i / 30) + 1}/${(i % 30) + 1}`,
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
  return Array.from({ length: count }, (_, i) => ({
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
  US: {
    name: "السوق الأمريكي",
    companies: generateCompanies(150, "US")
  },
  EU: {
    name: "السوق الأوروبي",
    companies: generateCompanies(150, "EU")
  },
  ASIA: {
    name: "الأسواق الآسيوية",
    companies: generateCompanies(150, "AS")
  },
  GULF: {
    name: "أسواق الخليج",
    companies: generateCompanies(150, "GU")
  }
};

const StockPriceChart = ({ data }: { data: StockDataPoint[] }) => {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="date" stroke="#ffffff60" />
          <YAxis stroke="#ffffff60" />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1f2937', 
              border: '1px solid #4b5563',
              borderRadius: '8px'
            }}
          />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GlobalMarkets = () => {
  const [selectedMarket, setSelectedMarket] = useState('US');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [alertPrice, setAlertPrice] = useState<number | null>(null);

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
  };

  const handleSetAlert = (price: number) => {
    setAlertPrice(price);
    // TODO: Implement alert system
  };

  const filteredCompanies = markets[selectedMarket].companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return <div className="space-y-6">
      <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
        <CardHeader>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h3 className="text-xl font-bold text-white">الأسواق العالمية</h3>
            <div className="flex gap-4 w-full md:w-auto">
              <Select value={selectedMarket} onValueChange={setSelectedMarket}>
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="اختر السوق" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {Object.entries(markets).map(([key, market]) => (
                    <SelectItem key={key} value={key} className="text-white hover:bg-white/10">
                      {market.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                onValueChange={(value) => {
                  const company = filteredCompanies.find(c => c.id.toString() === value);
                  if (company) handleCompanyClick(company);
                }}
              >
                <SelectTrigger className="w-[250px] bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="اختر الشركة" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  {filteredCompanies.map((company) => (
                    <SelectItem key={company.id} value={company.id.toString()} className="text-white hover:bg-white/10">
                      <div className="flex justify-between items-center gap-4 w-full">
                        <div className="flex flex-col">
                          <span>{company.name}</span>
                          <span className="text-xs text-gray-400">{company.sector}</span>
                        </div>
                        <div className="flex flex-col items-end">
                          <span>${company.price.toFixed(2)}</span>
                          <span className={company.change >= 0 ? 'text-green-400 text-xs' : 'text-red-400 text-xs'}>
                            {company.change > 0 ? '+' : ''}{company.change}%
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1 md:w-64">
                <Input 
                  placeholder="ابحث عن شركة..." 
                  value={searchQuery} 
                  onChange={e => setSearchQuery(e.target.value)} 
                  className="bg-white/5 border-white/10 text-white pl-10" 
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      {selectedCompany && <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
          <CardHeader className="flex flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold text-white">{selectedCompany.name}</h3>
              <p className="text-sm text-gray-400">{selectedCompany.symbol}</p>
              <p className="text-xs text-accent/80">{selectedCompany.sector}</p>
            </div>
            <Button variant="ghost" onClick={() => setSelectedCompany(null)}>×</Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Crypto Market Overview */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-white mb-2">العملات المشفرة</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {Object.entries(cryptoData).map(([key, data]) => (
                      <div key={key} className="p-2 bg-white/5 rounded">
                        <p className="text-sm text-gray-400">{data.name}</p>
                        <p className="text-green-400">{data.change}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stock Details */}
                <div>
                  <h4 className="text-white mb-2">تفاصيل السهم</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">السعر الحالي</p>
                      <p className="text-white">${selectedCompany.price.toFixed(2)}</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">التغير</p>
                      <p className={selectedCompany.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {selectedCompany.change > 0 ? '+' : ''}{selectedCompany.change}%
                      </p>
                    </div>
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">أعلى سعر</p>
                      <p className="text-white">${selectedCompany.highest_price.toFixed(2)}</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">أدنى سعر</p>
                      <p className="text-white">${selectedCompany.lowest_price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                {/* Trading Volume */}
                <div>
                  <h4 className="text-white mb-2">حجم التداول</h4>
                  <div className="p-2 bg-white/5 rounded">
                    <p className="text-white">{(selectedCompany.volume / 1000000).toFixed(1)}M</p>
                  </div>
                </div>
              </div>

              {/* Technical Analysis */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-white mb-2">التحليل الفني</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">RSI</p>
                      <p className="text-white">{selectedCompany.rsi}</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">MACD</p>
                      <p className="text-white">{selectedCompany.macd}</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">التقلب</p>
                      <p className="text-white">{selectedCompany.volatility}</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">مضاعف الربحية</p>
                      <p className="text-white">{selectedCompany.pe_ratio}</p>
                    </div>
                  </div>
                </div>

                {/* محاكي التداول */}
                <div>
                  <h4 className="text-white mb-2">محاكي التداول</h4>
                  <div className="p-3 bg-white/5 rounded space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">السعر الحالي</span>
                      <span className="text-white">${selectedCompany.price}</span>
                    </div>
                    <Input type="number" placeholder="عدد الأسهم" className="bg-white/5 border-white/10 text-white" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">القيمة الإجمالية</span>
                      <span className="text-white">${(selectedCompany.price * 100).toFixed(2)}</span>
                    </div>
                    <Button className="w-full bg-accent hover:bg-accent/80">محاكاة التداول</Button>
                  </div>
                </div>
              </div>

              {/* تنبيهات الأسعار والمؤشرات */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-white mb-2">تنبيهات الأسعار</h4>
                  <div className="p-3 bg-white/5 rounded space-y-2">
                    <Input type="number" placeholder="سعر التنبيه" className="bg-white/5 border-white/10 text-white" onChange={e => setAlertPrice(Number(e.target.value))} />
                    <Button className="w-full flex items-center justify-center gap-2" onClick={() => handleSetAlert(Number(alertPrice))}>
                      <Bell className="w-4 h-4" />
                      تعيين تنبيه
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-white mb-2">معلومات إضافية</h4>
                  <div className="space-y-2">
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">القيمة السوقية</p>
                      <p className="text-white">${(selectedCompany.market_cap / 1000000000000).toFixed(2)}B</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">عائد التوزيعات</p>
                      <p className="text-white">{selectedCompany.dividend_yield}%</p>
                    </div>
                    <div className="p-2 bg-white/5 rounded">
                      <p className="text-sm text-gray-400">حجم التداول</p>
                      <p className="text-white">{selectedCompany.volume.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>}
    </div>;
};
