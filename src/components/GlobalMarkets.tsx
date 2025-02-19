
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

const sectors = [
  "البنوك",
  "التكنولوجيا",
  "الطاقة",
  "الصناعة",
  "الاتصالات",
  "العقارات",
  "الرعاية الصحية",
  "السلع الاستهلاكية"
];

const generateStockData = (days: number) => {
  return Array.from({ length: days }, (_, i) => ({
    date: `2024/${Math.floor(i / 30) + 1}/${(i % 30) + 1}`,
    value: Math.random() * 100 + 20
  }));
};

const generateCompanies = (count: number, marketPrefix: string) => {
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
    highest_price: Math.round(Math.random() * 150)
  }));
};

const markets = {
  EGX: {
    name: "السوق المصري",
    companies: generateCompanies(150, "EGX")
  },
  TASI: {
    name: "السوق السعودي",
    companies: generateCompanies(150, "TASI")
  },
  KUWEIT: {
    name: "سوق الكويت",
    companies: generateCompanies(150, "KWT")
  },
  OMAN: {
    name: "سوق عُمان",
    companies: generateCompanies(150, "MSM")
  },
  QATAR: {
    name: "سوق قطر",
    companies: generateCompanies(150, "QSE")
  }
};

type Company = ReturnType<typeof generateCompanies>[0];

const StockPriceChart = ({ data }: { data: typeof generateStockData }) => {
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
  const [selectedMarket, setSelectedMarket] = useState('EGX');
  const [selectedSector, setSelectedSector] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const filteredCompanies = markets[selectedMarket].companies.filter(company =>
    (selectedSector === 'all' || company.sector === selectedSector) &&
    (company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.symbol.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
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
              <Select value={selectedSector} onValueChange={setSelectedSector}>
                <SelectTrigger className="w-[180px] bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="اختر القطاع" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-white/10">
                  <SelectItem value="all" className="text-white hover:bg-white/10">
                    جميع القطاعات
                  </SelectItem>
                  {sectors.map((sector) => (
                    <SelectItem key={sector} value={sector} className="text-white hover:bg-white/10">
                      {sector}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select 
                onValueChange={(value) => {
                  const company = filteredCompanies.find(c => c.id.toString() === value);
                  if (company) setSelectedCompany(company);
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
            </div>
          </div>
        </CardHeader>
      </Card>

      {selectedCompany && (
        <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedCompany.name}</h3>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-white">{selectedCompany.price.toFixed(2)}</span>
                      <span className={`text-lg ${selectedCompany.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedCompany.change > 0 ? '+' : ''}{selectedCompany.change}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-white mb-4">سعر السهم</h4>
                  <StockPriceChart data={selectedCompany.stockData} />
                </div>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">التحليل الفني</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-400">السعر الحالي</span>
                        <span className="text-white">{selectedCompany.current_price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">أعلى سعر</span>
                        <span className="text-white">{selectedCompany.highest_price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">أدنى سعر</span>
                        <span className="text-white">{selectedCompany.lowest_price}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-lg">
                    <h4 className="text-lg font-semibold text-white mb-4">توصيات التداول</h4>
                    <p className="text-gray-300 text-sm">
                      بناءً على تحليل البيانات المتوفرة لسهم {selectedCompany.name}، 
                      نقدم تحليلاً شاملاً وتوصيات التداول التالية...
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
