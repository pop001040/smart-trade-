import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Search, Bell, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';

interface Company {
  symbol: string;
  name: string;
  price: number;
  change: number;
}

const markets = {
  egypt: {
    name: "السوق المصري",
    symbols: [
      { symbol: "COMI.CA", name: "البنك التجاري الدولي" },
      { symbol: "HRHO.CA", name: "المجموعة المالية هيرميس" },
      { symbol: "TMGH.CA", name: "مجموعة طلعت مصطفى" },
      { symbol: "EAST.CA", name: "الشرقية للدخان" },
      { symbol: "SWDY.CA", name: "السويدي إليكتريك" }
    ]
  },
  saudi: {
    name: "السوق السعودي",
    symbols: [
      { symbol: "2222.SR", name: "أرامكو السعودية" },
      { symbol: "1180.SR", name: "الأهلي السعودي" },
      { symbol: "2010.SR", name: "سابك" },
      { symbol: "7010.SR", name: "الاتصالات السعودية" },
      { symbol: "1120.SR", name: "الراجحي" }
    ]
  },
  kuwait: {
    name: "السوق الكويتي",
    symbols: [
      { symbol: "KFH.KW", name: "بيت التمويل الكويتي" },
      { symbol: "NBK.KW", name: "بنك الكويت الوطني" },
      { symbol: "ZAIN.KW", name: "زين" },
      { symbol: "AGLT.KW", name: "أجيليتي" },
      { symbol: "BOUK.KW", name: "بنك بوبيان" }
    ]
  }
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
  const angle = value / 100 * 180 - 90;

  return <div className="relative w-full aspect-[2/1]">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-full h-full relative">
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <path d="M20 80 A 60 60 0 0 1 180 80" fill="none" stroke="url(#gradient)" strokeWidth="8" />
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
  const [selectedMarket, setSelectedMarket] = useState<string>("egypt");
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const apiKey = 'f2d390029a6b4178819b60dc1064a23c';
        const market = markets[selectedMarket as keyof typeof markets];
        
        const promises = market.symbols.map(async (stock) => {
          const response = await fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKey}`
          );
          const data = await response.json();
          
          if (data['Global Quote']) {
            return {
              symbol: stock.symbol,
              name: stock.name,
              price: parseFloat(data['Global Quote']['05. price']),
              change: parseFloat(data['Global Quote']['09. change'])
            };
          }
          return null;
        });

        const results = (await Promise.all(promises)).filter(Boolean) as Company[];
        setCompanies(results);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };

    fetchMarketData();
  }, [selectedMarket]);

  const filteredCompanies = companies.filter(company =>
    company.name.includes(searchQuery) ||
    company.symbol.includes(searchQuery)
  );

  return <div className="space-y-6">
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
            value={selectedCompany?.symbol || ''}
            onValueChange={(value) => {
              const company = companies.find(c => c.symbol === value);
              if (company) {
                setSelectedCompany(company);
                setShowDetails(true);
              }
            }}
          >
            <SelectTrigger className="w-full bg-zinc-800 text-white border-zinc-700">
              <SelectValue placeholder="اختر شركة" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white border-zinc-700 max-h-[300px]">
              {filteredCompanies.map(company => (
                <SelectItem
                  key={company.symbol}
                  value={company.symbol}
                  className="hover:bg-zinc-700"
                >
                  <div className="flex items-center justify-between w-full">
                    <span>{company.name}</span>
                    <span className={company.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      ${company.price.toFixed(2)} ({company.change >= 0 ? '+' : ''}{company.change}%)
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {showDetails && selectedCompany && (
        <Card className="backdrop-blur bg-[#2D3047] text-white">
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
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 gap-6">
              <StockPriceChart data={generateStockData(30)} />
              
              <Card className="bg-zinc-900/50">
                <CardHeader>
                  <h3 className="text-lg font-semibold">تحليلات فنية</h3>
                  <p className="text-sm">تلخيص ما تقترحه المؤشرات</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-center mb-2">المتوسطات المتحركة</h4>
                      <TechnicalGauge value={75} type="شراء" />
                    </div>
                    <div>
                      <h4 className="text-center mb-2">الملخص</h4>
                      <TechnicalGauge value={50} type="حيادية" />
                    </div>
                    <div>
                      <h4 className="text-center mb-2">المؤشرات الفنية</h4>
                      <TechnicalGauge value={25} type="بيع" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="backdrop-blur bg-zinc-900">
        <CardHeader>
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-white">أسعار الفوركس المتقاطعة</h3>
          </div>
          <p className="text-sm text-white">يتيح لك هذا الجدول عرض أسعار العملات المحددة لحظياً مقارنة بالعملات الرئيسية الأخرى.</p>
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
            {marketMovementData.map((sector, index) => (
              <div key={index} className={`p-4 rounded-lg ${sector.performance >= 0 ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
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
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>;
};
