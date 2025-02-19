
import { Card, CardHeader, CardContent } from '@/components/ui/card';

const news = [
  {
    id: 1,
    title: "ارتفاع مؤشر EGX30 بنسبة 2.5% مدفوعاً بأداء قوي للبنوك",
    time: "منذ ساعتين",
    category: "السوق المصري",
    summary: "شهد السوق المصري ارتفاعاً قوياً بدعم من أداء قطاع البنوك والعقارات"
  },
  {
    id: 2,
    title: "تداول السعودية يصعد لأعلى مستوى في 6 أشهر",
    time: "منذ 3 ساعات",
    category: "السوق السعودي",
    summary: "واصل السوق السعودي صعوده القوي مدعوماً بارتفاع أسعار النفط"
  },
  {
    id: 3,
    title: "بورصة قطر تسجل مكاسب قوية بقيادة قطاع البنوك",
    time: "منذ 4 ساعات",
    category: "السوق القطري",
    summary: "ارتفعت بورصة قطر بدعم من النتائج القوية للبنوك القطرية"
  },
  {
    id: 4,
    title: "الدولار يتراجع أمام العملات الرئيسية",
    time: "منذ 5 ساعات",
    category: "العملات",
    summary: "شهد الدولار تراجعاً مقابل سلة العملات الرئيسية بعد بيانات اقتصادية"
  },
  {
    id: 5,
    title: "البنوك المركزية تبحث تشديد السياسة النقدية",
    time: "منذ 6 ساعات",
    category: "الاقتصاد العالمي",
    summary: "تدرس البنوك المركزية العالمية إمكانية رفع أسعار الفائدة"
  }
];

export const NewsSection = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
      <CardHeader>
        <h3 className="text-xl font-bold text-white">آخر الأخبار المالية</h3>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {news.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-lg hover:bg-white/5 transition-colors border border-white/10"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm text-accent/80 px-2 py-1 rounded-full bg-accent/10">
                  {item.category}
                </span>
                <span className="text-xs text-gray-400">{item.time}</span>
              </div>
              <h4 className="text-white text-right mb-2">{item.title}</h4>
              <p className="text-sm text-gray-400 text-right">{item.summary}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
