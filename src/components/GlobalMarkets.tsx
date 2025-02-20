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
    change: "+0.32%",
    price: "1.0934"
  },
  gbpusd: {
    name: "GBP/USD",
    change: "-0.15%",
    price: "1.2654"
  },
  usdjpy: {
    name: "USD/JPY",
    change: "+0.45%",
    price: "147.89"
  },
  usdchf: {
    name: "USD/CHF",
    change: "-0.28%",
    price: "0.8745"
  },
  audusd: {
    name: "AUD/USD",
    change: "+0.18%",
    price: "0.6589"
  },
  usdcad: {
    name: "USD/CAD",
    change: "-0.22%",
    price: "1.3456"
  },
  nzdusd: {
    name: "NZD/USD",
    change: "+0.25%",
    price: "0.6123"
  },
  eurjpy: {
    name: "EUR/JPY",
    change: "+0.38%",
    price: "161.75"
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
  global: {
    name: "السوق العالمي",
    companies: generateCompanies(100, "GLOBAL")
  },
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

const StockPriceChart = ({
  data
}: {
  data: StockDataPoint[];
}) => {
  return <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
          <XAxis dataKey="date" stroke="#ffffff60" tick={{
          fill: '#ffffff80'
        }} />
          <YAxis stroke="#ffffff60" tick={{
          fill: '#ffffff80'
        }} />
          <Tooltip contentStyle={{
          backgroundColor: '#1f2937',
          border: '1px solid #4b5563',
          borderRadius: '8px'
        }} />
          <Area type="monotone" dataKey="value" stroke="#4F46E5" fill="url(#colorValue)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>;
};

const TechnicalGauge = ({
  value,
  type
}: {
  value: number;
  type: 'شراء' | 'حيادية' | 'بيع';
}) => {
  const angle = value / 100 * 180 - 90; // Convert value to angle between -90 and 90 degrees

  return <div className="relative w-full aspect-[2/1]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative">
          {/* Background Arc */}
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <path d="M20 80 A 60 60 0 0 1 180 80" fill="none" stroke="url(#gradient)" strokeWidth="8" />
            {/* Needle */}
            <g transform={`rotate(${angle}, 100, 80)`}>
              <line x1="100" y1="80" x2="100" y2="30" stroke="white" strokeWidth="2" />
            </g>
            <text x="100" y="95" textAnchor="middle" fill="white" className="text-sm">
              {type}
            </text>
          </svg>
        </div>
      </div>
    </div>;
};

const CurrencyMatrix = () => {
  const currencies = ['EUR', 'USD', 'JPY', 'GBP', 'CHF', 'AUD', 'CAD', 'NZD'];
  const rates = {
    'EUR/USD': 1.05171,
    'EUR/JPY': 157.123,
    'GBP/USD': 1.2154
    // ... add more rates
  };
  return <div className="overflow-x-auto">
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase bg-zinc-800/50">
          <tr>
            <th className="p-2"></th>
            {currencies.map(cur => <th key={cur} className="p-2">{cur}</th>)}
          </tr>
        </thead>
        <tbody>
          {currencies.map((baseCur, i) => <tr key={baseCur} className={i % 2 === 0 ? 'bg-zinc-800/30' : 'bg-zinc-800/10'}>
              <td className="p-2 font-medium">{baseCur}</td>
              {currencies.map(quoteCur => <td key={`${baseCur}/${quoteCur}`} className="p-2">
                  {baseCur === quoteCur ? <span className="text-gray-500">1.0000</span> : <span className={Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}>
                      {(Math.random() * 2 + 0.5).toFixed(4)}
                    </span>}
                </td>)}
            </tr>)}
        </tbody>
      </table>
    </div>;
};

export const GlobalMarkets = () => {
  const [selectedMarket, setSelectedMarket] = useState("global");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  const filteredCompanies = markets[selectedMarket as keyof typeof markets].companies.filter(company => company.name.toLowerCase().includes(searchQuery.toLowerCase()) || company.symbol.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleCompanyClick = (company: Company) => {
    setSelectedCompany(company);
    setShowDetails(true);
  };

  const marketMovementData = [{
    sector: "التكنولوجيا",
    performance: 2.5,
    volume: 1500000
  }, {
    sector: "البنوك",
    performance: -1.2,
    volume: 2100000
  }, {
    sector: "العقارات",
    performance: 0.8,
    volume: 900000
  }, {
    sector: "الطاقة",
    performance: 3.2,
    volume: 1800000
  }, {
    sector: "الصناعة",
    performance: -0.5,
    volume: 1200000
  }, {
    sector: "الاتصالات",
    performance: 1.5,
    volume: 1000000
  }, {
    sector: "الرعاية الصحية",
    performance: 2.1,
    volume: 1600000
  }, {
    sector: "المواد الأساسية",
    performance: -1.8,
    volume: 1400000
  }];

  return (
    <div className="space-y-6">
      <div className="relative w-full bg-black text-center py-12 px-4 rounded-lg overflow-hidden">
        <h1 className="text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-transparent bg-clip-text">اخـتر</span>{" "}
          <span className="bg-gradient-to-r from-purple-600 to-pink-500 text-transparent bg-clip-text">افضل</span>
        </h1>
        <h2 className="text-4xl font-bold text-white mb-4">الأدوات لنفسك</h2>
        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          اصنع طريقك إلى تجربة مستخدم مالية مذهلة باستخدام أدواتنا المجانية.
        </p>
        <div className="relative w-full max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-purple-600/20 rounded-lg"></div>
          <video 
            className="w-full aspect-[21/9] object-cover rounded-lg"
            controls
            autoPlay
            muted
            loop
          >
            <source src="/widgets-main-video.a3d7152108cd9db92d6c.webm" type="video/webm" />
            يرجى تحديث متصفحك لدعم تشغيل الفيديو
          </video>
        </div>
      </div>

      <Card className="backdrop-blur bg-zinc-950">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedMarket} onValueChange={value => {
              setSelectedMarket(value);
              setSelectedCompany(null);
              setShowDetails(false);
            }}>
              <SelectTrigger className="w-[200px] bg-zinc-800 text-white border-zinc-700">
                <SelectValue placeholder="اختر السوق" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-white border-zinc-700">
                {Object.entries(markets).map(([key, market]) => <SelectItem key={key} value={key} className="hover:bg-zinc-700">
                    {market.name}
                  </SelectItem>)}
              </SelectContent>
            </Select>
            
            <div className="flex-1 relative">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input className="pl-8" placeholder="ابحث عن شركة..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Select value={selectedCompany?.id.toString() || ''} onValueChange={value => {
            const company = filteredCompanies.find(c => c.id.toString() === value);
            if (company) {
              setSelectedCompany(company);
              setShowDetails(true);
            }
          }}>
            <SelectTrigger className="w-full bg-zinc-800 text-white border-zinc-700">
              <SelectValue placeholder="اختر شركة" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white border-zinc-700 max-h-[300px]">
              {filteredCompanies.map(company => <SelectItem key={company.id} value={company.id.toString()} className="hover:bg-zinc-700">
                  <div className="flex items-center justify-between w-full">
                    <span>{company.name}</span>
                    <span className={company.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      ${company.price} ({company.change >= 0 ? '+' : ''}{company.change}%)
                    </span>
                  </div>
                </SelectItem>)}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {showDetails && selectedCompany && <Card className="backdrop-blur bg-[#2D3047] text-white">
          <CardHeader className="border-b border-gray-700">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold">{selectedCompany.name}</h2>
                <p className="text-sm text-gray-400">{selectedCompany.symbol}</p>
              </div>
              <Button variant="outline" size="icon" onClick={() => setShowDetails(false)}>
                <span className="text-lg">×</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-4 bg-zinc-950 hover:bg-zinc-800">
            <div className="grid grid-cols-1 gap-6">
              <StockPriceChart data={selectedCompany.stockData} />
              
              <Card className="bg-zinc-900/50">
                <CardHeader className="bg-gray-950 hover:bg-gray-800">
                  <h3 className="text-lg font-semibold text-slate-50">تحليلات فنية</h3>
                  <p className="text-sm text-slate-50">تلخيص ما تقترحه المؤشرات</p>
                </CardHeader>
                <CardContent className="rounded-sm bg-neutral-950 hover:bg-neutral-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-center mb-2 text-gray-50">المتوسطات المتحركة</h4>
                      <TechnicalGauge value={75} type="شراء" />
                    </div>
                    <div>
                      <h4 className="text-center mb-2 text-slate-50">الملخص</h4>
                      <TechnicalGauge value={50} type="حيادية" />
                    </div>
                    <div>
                      <h4 className="text-center mb-2 text-zinc-50">المؤشرات الفنية</h4>
                      <TechnicalGauge value={25} type="بيع" />
                    </div>
                  </div>
                </CardContent>
              </Card>

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

                <div className="bg-gray-50">
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg mb-4">محاكي التداول</h3>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Input type="number" className="bg-[#1F2937] border-gray-700 text-white" placeholder="السعر" />
                    </div>
                    <div className="flex-1">
                      <Input type="number" className="bg-[#1F2937] border-gray-700 text-white" placeholder="الكمية" />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg mb-4">تنبيهات الأسعار</h3>
                  <div className="flex gap-4">
                    <Input type="number" className="bg-[#1F2937] border-gray-700 text-white" placeholder="السعر المستهدف" />
                    <Button variant="outline" className="bg-gray-950 hover:bg-gray-800">
                      تعيين تنبيه
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>}

      <Card className="backdrop-blur bg-zinc-900">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">أسعار الفوركس المتقاطعة</h3>
            
          </div>
          <p className="text-sm text-zinc-50">يتيح لك هذا الجدول عرض أسعار العملات المحددة لحظياً مقارنة بالعملات الرئيسية الأخرى.</p>
        </CardHeader>
        <CardContent>
          <CurrencyMatrix />
        </CardContent>
      </Card>

      <Card className="backdrop-blur bg-zinc-900">
        <CardHeader>
          <h3 className="text-lg font-bold text-white">خريطة تحرك الأسهم</h3>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {marketMovementData.map((sector, index) => <div key={index} className={`p-4 rounded-lg ${sector.performance >= 0 ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                <h4 className="text-white font-medium mb-2">{sector.sector}</h4>
                <div className="space-y-2">
                  <p className={`text-lg font-bold ${sector.performance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {sector.performance >= 0 ? '+' : ''}{sector.performance}%
                    {sector.performance >= 0 ? <TrendingUp className="h-4 w-4 inline mr-1" /> : <TrendingDown className="h-4 w-4 inline mr-1" />}
                  </p>
                  <p className="text-gray-400 text-sm">
                    حجم التداول: {sector.volume.toLocaleString()}
                  </p>
                </div>
              </div>)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
