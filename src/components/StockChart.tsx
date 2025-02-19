
import { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip 
} from 'recharts';
import { Card } from '@/components/ui/card';

const data = [
  { date: '1/1', value: 1000 },
  { date: '2/1', value: 1200 },
  { date: '3/1', value: 1100 },
  { date: '4/1', value: 1300 },
  { date: '5/1', value: 1400 },
  { date: '6/1', value: 1380 },
  { date: '7/1', value: 1500 }
];

export const StockChart = () => {
  return (
    <Card className="p-6 backdrop-blur-sm bg-white/10 border border-white/20">
      <h3 className="text-xl font-bold text-white mb-4 text-right">مؤشر السوق</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FFD700" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
            <XAxis dataKey="date" stroke="#ffffff60" />
            <YAxis stroke="#ffffff60" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#2D3047', 
                border: '1px solid #FFD700',
                borderRadius: '8px' 
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#FFD700"
              fillOpacity={1}
              fill="url(#colorValue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
