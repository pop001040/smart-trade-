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
    symbols: [{
      symbol: "COMI.CA",
      name: "البنك التجاري الدولي"
    }, {
      symbol: "EAST.CA",
      name: "الشرقية للدخان"
    }, {
      symbol: "FWRY.CA",
      name: "فوري"
    }, {
      symbol: "TMGH.CA",
      name: "طلعت مصطفى"
    }, {
      symbol: "HRHO.CA",
      name: "هيرميس"
    }, {
      symbol: "SWDY.CA",
      name: "السويدي إليكتريك"
    }, {
      symbol: "EFIH.CA",
      name: "إي فاينانس"
    }, {
      symbol: "ABUK.CA",
      name: "أبو قير للأسمدة"
    }, {
      symbol: "ETEL.CA",
      name: "المصرية للاتصالات"
    }, {
      symbol: "AMOC.CA",
      name: "أموك"
    }]
  },
  saudi: {
    name: "السوق السعودي",
    symbols: [{
      symbol: "2222.SR",
      name: "أرامكو السعودية"
    }, {
      symbol: "1120.SR",
      name: "الراجحي"
    }, {
      symbol: "2350.SR",
      name: "كيان السعودية"
    }, {
      symbol: "2310.SR",
      name: "سبكيم العالمية"
    }, {
      symbol: "1211.SR",
      name: "معادن"
    }, {
      symbol: "2001.SR",
      name: "كيمانول"
    }, {
      symbol: "2290.SR",
      name: "ينساب"
    }, {
      symbol: "4231.SR",
      name: "الزامل للصناعة"
    }, {
      symbol: "2330.SR",
      name: "المتقدمة"
    }, {
      symbol: "2380.SR",
      name: "بتروكيم"
    }]
  },
  kuwait: {
    name: "السوق الكويتي",
    symbols: [{
      symbol: "NBK.KW",
      name: "بنك الكويت الوطني"
    }, {
      symbol: "KFH.KW",
      name: "بيت التمويل الكويتي"
    }, {
      symbol: "ZAIN.KW",
      name: "زين"
    }, {
      symbol: "BOUBYAN.KW",
      name: "بنك بوبيان"
    }, {
      symbol: "AGILITY.KW",
      name: "أجيليتي"
    }, {
      symbol: "KPROJ.KW",
      name: "مشاريع الكويت"
    }, {
      symbol: "MEZZAN.KW",
      name: "ميزان"
    }, {
      symbol: "NIND.KW",
      name: "الصناعات الوطنية"
    }, {
      symbol: "AGLTY.KW",
      name: "أجيليتي للمخازن"
    }, {
      symbol: "BURG.KW",
      name: "برقان"
    }]
  },
  oman: {
    name: "السوق العماني",
    symbols: [{
      symbol: "EXNESS.OM",
      name: "Exness Oman"
    }, {
      symbol: "UBHAR.OM",
      name: "Ubhar Capital"
    }, {
      symbol: "GBCM.OM",
      name: "Gulf Baader Capital Markets"
    }, {
      symbol: "USC.OM",
      name: "United Securities Oman"
    }, {
      symbol: "VISION.OM",
      name: "Vision Investment Services"
    }, {
      symbol: "MADINA.OM",
      name: "Al-Madina Investment"
    }, {
      symbol: "TANMIA.OM",
      name: "Tanmia Capital"
    }, {
      symbol: "MUSCAT.OM",
      name: "Muscat Capital"
    }, {
      symbol: "KAWTHAR.OM",
      name: "Al Kawthar Investment"
    }, {
      symbol: "OAB.OM",
      name: "Oman Arab Bank Brokerage"
    }]
  },
  qatar: {
    name: "السوق القطري",
    symbols: [{
      symbol: "QINVEST.QA",
      name: "QInvest"
    }, {
      symbol: "DBSEC.QA",
      name: "Doha Bank Securities"
    }, {
      symbol: "QNBCAP.QA",
      name: "QNB Capital"
    }, {
      symbol: "MASRAF.QA",
      name: "Masraf Al Rayan Securities"
    }, {
      symbol: "QIBSEC.QA",
      name: "Qatar Islamic Bank Securities"
    }, {
      symbol: "BARWA.QA",
      name: "Barwa Capital"
    }, {
      symbol: "KHALIJ.QA",
      name: "Al Khalij Capital"
    }, {
      symbol: "KOOT.QA",
      name: "Al Koot Securities"
    }, {
      symbol: "ASMAKH.QA",
      name: "Al Asmakh Investment"
    }, {
      symbol: "QFS.QA",
      name: "Qatar Financial Services"
    }]
  },
  global: {
    name: "الأسواق العالمية",
    symbols: [{
      symbol: "PPSTR",
      name: "Pepperstone"
    }, {
      symbol: "FXTM",
      name: "ForexTime"
    }, {
      symbol: "FPM",
      name: "FP Markets"
    }, {
      symbol: "FOREX",
      name: "Forex.com"
    }, {
      symbol: "IGM",
      name: "IG Markets"
    }, {
      symbol: "IBKR",
      name: "Interactive Brokers"
    }, {
      symbol: "OANDA",
      name: "OANDA"
    }, {
      symbol: "SAXO",
      name: "Saxo Bank"
    }, {
      symbol: "TDAM",
      name: "TD Ameritrade"
    }, {
      symbol: "ETRADE",
      name: "E*TRADE"
    }, {
      symbol: "HOOD",
      name: "Robinhood"
    }, {
      symbol: "FID",
      name: "Fidelity Investments"
    }, {
      symbol: "MER",
      name: "Merrill Edge"
    }, {
      symbol: "ALP",
      name: "Alpari"
    }, {
      symbol: "XMG",
      name: "XM Group"
    }, {
      symbol: "HF",
      name: "HotForex"
    }, {
      symbol: "ADM",
      name: "Admiral Markets"
    }, {
      symbol: "CMC",
      name: "CMC Markets"
    }, {
      symbol: "CITY",
      name: "City Index"
    }, {
      symbol: "PLUS",
      name: "Plus500"
    }]
  },
  banks: {
    name: "البنوك العالمية",
    symbols: [{
      symbol: "GS",
      name: "Goldman Sachs"
    }, {
      symbol: "MS",
      name: "Morgan Stanley"
    }, {
      symbol: "JPM",
      name: "J.P. Morgan Chase"
    }, {
      symbol: "C",
      name: "Citigroup"
    }, {
      symbol: "BAC",
      name: "Bank of America"
    }, {
      symbol: "DB",
      name: "Deutsche Bank"
    }, {
      symbol: "UBS",
      name: "UBS Group"
    }, {
      symbol: "CS",
      name: "Credit Suisse"
    }, {
      symbol: "BNP",
      name: "BNP Paribas"
    }, {
      symbol: "HSBC",
      name: "HSBC Holdings"
    }]
  },
  digital: {
    name: "منصات التداول الإلكترونية",
    symbols: [{
      symbol: "ETORO",
      name: "eToro"
    }, {
      symbol: "212",
      name: "Trading 212"
    }, {
      symbol: "DEGIRO",
      name: "Degiro"
    }, {
      symbol: "REVOLUT",
      name: "Revolut Trading"
    }, {
      symbol: "PRT",
      name: "ProRealTime"
    }, {
      symbol: "TR",
      name: "TradeRepublic"
    }, {
      symbol: "FXPR",
      name: "FxPrimus"
    }, {
      symbol: "ICM",
      name: "ICM Capital"
    }, {
      symbol: "DARWIN",
      name: "Darwinex"
    }, {
      symbol: "LMAX",
      name: "LMAX Exchange"
    }]
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
  const [rates, setRates] = useState({
    'EUR/USD': 1.05171,
    'EUR/SAR': 3.9425,
    'USD/SAR': 3.7500,
    'GBP/USD': 1.2154,
    'USD/AED': 3.6725,
    'USD/QAR': 3.6400
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setRates(prevRates => {
        const newRates = {
          ...prevRates
        };
        Object.keys(newRates).forEach(pair => {
          newRates[pair] = prevRates[pair] * (1 + (Math.random() - 0.5) * 0.001);
        });
        return newRates;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  const currencies = ['EUR', 'USD', 'SAR', 'AED', 'QAR', 'GBP'];
  return <div className="overflow-x-auto">
      <table className="w-full text-sm text-right text-gray-300">
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
                  {baseCur === quoteCur ? <span className="text-gray-500">1.0000</span> : <span className={`transition-colors duration-300 ${Math.random() > 0.5 ? 'text-green-400' : 'text-red-400'}`}>
                      {rates[`${baseCur}/${quoteCur}`]?.toFixed(4) || rates[`${quoteCur}/${baseCur}`]?.toFixed(4) || (Math.random() * 2 + 0.5).toFixed(4)}
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
        const promises = market.symbols.map(async stock => {
          const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock.symbol}&apikey=${apiKey}`);
          const data = await response.json();
          if (data['Global Quote']) {
            return {
              symbol: stock.symbol,
              name: stock.name,
              price: parseFloat(data['Global Quote']['05. price']),
              change: parseFloat(data['Global Quote']['09. change'])
            };
          }
          return {
            symbol: stock.symbol,
            name: stock.name,
            price: 0,
            change: 0
          };
        });
        const results = await Promise.all(promises);
        setCompanies(results);
      } catch (error) {
        console.error('Error fetching market data:', error);
      }
    };
    fetchMarketData();
  }, [selectedMarket]);

  const filteredCompanies = companies.filter(company => company.name.includes(searchQuery) || company.symbol.includes(searchQuery));

  return (
    <div className="space-y-6">
      <Card className="backdrop-blur bg-zinc-950">
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4">
            <Select value={selectedMarket} onValueChange={setSelectedMarket}>
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
          <Select value={selectedCompany?.symbol || ''} onValueChange={value => {
          const company = companies.find(c => c.symbol === value);
          if (company) {
            setSelectedCompany(company);
            setShowDetails(true);
          }
        }}>
            <SelectTrigger className="w-full bg-zinc-800 text-white border-zinc-700">
              <SelectValue placeholder="اختر شركة" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white border-zinc-700 max-h-[300px]">
              {filteredCompanies.map(company => <SelectItem key={company.symbol} value={company.symbol} className="hover:bg-zinc-700">
                  <div className="flex items-center justify-between w-full">
                    <span>{company.name}</span>
                    <span className={company.change >= 0 ? 'text-green-400' : 'text-red-400'}>
                      ${company.price.toFixed(2)} ({company.change >= 0 ? '+' : ''}{company.change}%)
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
          <CardContent className="pt-4">
            <div className="grid grid-cols-1 gap-6">
              <StockPriceChart data={generateStockData(30)} />
              
              <Card className="bg-zinc-900/50">
                <CardHeader className="bg-zinc-50">
                  <h3 className="text-lg font-semibold">تحليلات فنية</h3>
                  <p className="text-sm">تلخيص ما تقترحه المؤشرات</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h4 className="text-center mb-2 text-zinc-50">المتوسطات المتحركة</h4>
                      <TechnicalGauge value={75} type="شراء" />
                    </div>
                    <div>
                      <h4 className="text-center mb-2 text-zinc-50">الملخص</h4>
                      <TechnicalGauge value={50} type="حيادية" />
                    </div>
                    <div>
                      <h4 className="text-center mb-2 text-gray-50">المؤشرات الفنية</h4>
                      <TechnicalGauge value={25} type="بيع" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>}

      <Card className="backdrop-blur bg-zinc-900">
        <CardHeader>
          <h3 className="text-lg font-bold text-white">أسعار الفوركس المتقاطعة</h3>
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

      <Card className="backdrop-blur bg-zinc-900">
        <CardHeader>
          <h3 className="text-lg font-bold text-white">سوق العملات الرقمية</h3>
        </CardHeader>
        <CardContent>
          <img 
            src="/lovable-uploads/76220a3d-4bf1-498f-88d6-e1c49697baab.png" 
            alt="Digital Currency Market" 
            className="w-full rounded-lg shadow-lg border border-zinc-800"
          />
        </CardContent>
      </Card>
    </div>
  );
};
