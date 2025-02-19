
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Search, ChevronDown } from 'lucide-react';

const markets = {
  US: {
    name: "السوق الأمريكي",
    companies: [
      { id: 1, symbol: "AAPL", name: "Apple Inc", sector: "التكنولوجيا", price: 175.25, change: 2.3 },
      { id: 2, symbol: "MSFT", name: "Microsoft", sector: "التكنولوجيا", price: 325.80, change: 1.8 },
      // ... سيتم إضافة 150 شركة لكل سوق
    ]
  },
  EU: {
    name: "السوق الأوروبي",
    companies: [
      { id: 1, symbol: "SAP.DE", name: "SAP SE", sector: "التكنولوجيا", price: 142.30, change: -0.5 },
      // ... سيتم إضافة المزيد من الشركات
    ]
  },
  ASIA: {
    name: "الأسواق الآسيوية",
    companies: [
      { id: 1, symbol: "9984.T", name: "SoftBank Group", sector: "التكنولوجيا", price: 6150, change: 1.2 },
      // ... سيتم إضافة المزيد من الشركات
    ]
  }
};

export const GlobalMarkets = () => {
  const [selectedMarket, setSelectedMarket] = useState('US');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCompanyClick = (company) => {
    setSelectedCompany(company);
  };

  const filteredCompanies = markets[selectedMarket].companies.filter(company =>
    company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    company.symbol.toLowerCase().includes(searchQuery.toLowerCase())
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
                <SelectContent>
                  {Object.entries(markets).map(([key, market]) => (
                    <SelectItem key={key} value={key}>{market.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="relative flex-1 md:w-64">
                <Input
                  placeholder="ابحث عن شركة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/5 border-white/10 text-white pl-10"
                />
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {filteredCompanies.map((company) => (
              <div
                key={company.id}
                onClick={() => handleCompanyClick(company)}
                className="p-4 rounded-lg hover:bg-white/5 transition-colors border border-white/10 cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium">{company.symbol}</h4>
                    <p className="text-sm text-gray-400">{company.name}</p>
                    <span className="text-xs text-accent/80">{company.sector}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-medium">${company.price}</p>
                    <span className={`flex items-center ${company.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {company.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 ml-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 ml-1" />
                      )}
                      {company.change > 0 ? '+' : ''}{company.change}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {selectedCompany && (
        <CompanyDetails company={selectedCompany} onClose={() => setSelectedCompany(null)} />
      )}
    </div>
  );
};

const CompanyDetails = ({ company, onClose }) => {
  return (
    <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
      <CardHeader className="flex flex-row justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-white">{company.name}</h3>
          <p className="text-sm text-gray-400">{company.symbol}</p>
        </div>
        <Button variant="ghost" onClick={onClose}>×</Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h4 className="text-white mb-2">التحليل الفني</h4>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 bg-white/5 rounded">
                  <p className="text-sm text-gray-400">RSI</p>
                  <p className="text-white">65.4</p>
                </div>
                <div className="p-2 bg-white/5 rounded">
                  <p className="text-sm text-gray-400">MACD</p>
                  <p className="text-white">1.23</p>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-white mb-2">توقعات الذكاء الاصطناعي</h4>
              <div className="p-3 bg-white/5 rounded">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">مستوى الثقة</span>
                  <span className="text-green-400">85%</span>
                </div>
                <p className="text-white text-sm">توقع ارتفاع السعر خلال الأسبوع القادم</p>
              </div>
            </div>
          </div>
          <div>
            <h4 className="text-white mb-2">نقاط الدخول والخروج</h4>
            <div className="space-y-2">
              <div className="p-2 bg-white/5 rounded">
                <p className="text-sm text-gray-400">نقطة الدخول المقترحة</p>
                <p className="text-green-400">${company.price - 5}</p>
              </div>
              <div className="p-2 bg-white/5 rounded">
                <p className="text-sm text-gray-400">نقطة الخروج المقترحة</p>
                <p className="text-red-400">${company.price + 10}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
