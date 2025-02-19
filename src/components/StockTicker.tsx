
import { useEffect, useState } from "react";

const stockNews = [
  "البورصة المصرية تغلق على ارتفاع بنسبة 1.2% في جلسة اليوم",
  "البنك المركزي المصري يبقي على أسعار الفائدة دون تغيير",
  "شركات التكنولوجيا تقود مكاسب السوق السعودي",
  "بورصة قطر تسجل أعلى مستوى في 6 أشهر",
  "أسواق الخليج تتحرك بشكل إيجابي مع ارتفاع أسعار النفط"
];

export const StockTicker = () => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prev) => (prev - 1) % (window.innerWidth * 2));
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black/50 py-2 overflow-hidden relative">
      <div
        className="whitespace-nowrap absolute"
        style={{
          transform: `translateX(${position}px)`,
          direction: "ltr"
        }}
      >
        {stockNews.map((news, index) => (
          <span
            key={index}
            className="mx-8 text-white inline-block"
          >
            {news}
          </span>
        ))}
      </div>
    </div>
  );
};
