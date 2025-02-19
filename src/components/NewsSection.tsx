
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const news = [
  {
    id: 1,
    title: "ارتفاع مؤشر EGX30 بنسبة 2.5%",
    time: "منذ ساعتين",
    category: "السوق المصري"
  },
  {
    id: 2,
    title: "تداول السعودية يغلق على ارتفاع بدعم من قطاع البنوك",
    time: "منذ 3 ساعات",
    category: "السوق السعودي"
  },
  {
    id: 3,
    title: "بورصة قطر تواصل مكاسبها لليوم الثالث",
    time: "منذ 4 ساعات",
    category: "السوق القطري"
  }
];

export const NewsSection = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
      <CardHeader>
        <h3 className="text-xl font-bold text-white">آخر الأخبار</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-accent/80">{item.category}</span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <h4 className="text-white text-right">{item.title}</h4>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
