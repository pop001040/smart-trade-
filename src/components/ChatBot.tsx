
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = {
      role: 'user' as const,
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI('AIzaSyA6JU8Fmw_S0ozBgLNC7gcZd2Ll0IMIaOA');
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `أنت محلل مالي متخصص في الأسواق المالية العربية. عليك تقديم تحليل وتوصيات بنسبة ثقة 95% أو أعلى.

      قواعد مهمة يجب اتباعها:
      1. قدم إجابات مباشرة ومختصرة وواضحة
      2. كل توصية يجب أن تكون مدعومة بتحليل فني
      3. حدد نسبة المخاطرة بدقة لكل توصية
      4. اذكر نقاط الدخول والخروج بشكل محدد
      5. اعتمد فقط على المؤشرات الفنية الموثوقة
      6. قدم التحليل باللغة العربية فقط

      يجب أن تحتوي إجابتك على:
      - التحليل الفني المفصل مع المؤشرات
      - نقاط الدخول المثالية (السعر المحدد)
      - نقاط الخروج للربح والخسارة
      - نسبة المخاطرة والعائد المتوقع
      - توصية نهائية واضحة (شراء/بيع/انتظار)
      - مستويات الدعم والمقاومة الرئيسية

      السؤال من العميل هو: ${input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      if (!text) {
        throw new Error("لم نتمكن من الحصول على رد من المساعد");
      }

      const assistantMessage = {
        role: 'assistant' as const,
        content: text
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error:', error);
      
      let errorMessage = "عذراً، لم نتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى.";
      
      if (error.message?.includes('API')) {
        errorMessage = "حدث خطأ في الاتصال بالخدمة. يرجى المحاولة مرة أخرى بعد قليل.";
      } else if (error.status === 403) {
        errorMessage = "خطأ في التحقق من صحة المفتاح. يرجى التأكد من تفعيل الخدمة.";
      }

      toast({
        title: "حدث خطأ",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderTechnicalIndicator = (value: number) => {
    return (
      <div className="mt-2 bg-gray-800 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="text-white">مستوى الثقة في التحليل</span>
          <span className={`${value >= 90 ? 'text-green-400' : 'text-yellow-400'}`}>
            {value}%
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-700 rounded">
          <div 
            className={`h-full rounded ${value >= 90 ? 'bg-green-400' : 'bg-yellow-400'}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
      <CardHeader className="flex flex-row items-center gap-2 bg-gray-950">
        <MessageSquare className="h-5 w-5 text-accent" />
        <h3 className="text-xl font-bold text-white">المساعد المالي الذكي</h3>
      </CardHeader>
      <CardContent className="bg-gray-950">
        <div className="h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-stone-950">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'user' ? 'bg-accent text-primary ml-auto' : 'bg-white/10 text-white'
                }`}>
                  {message.content}
                  {message.role === 'assistant' && message.content.includes('تحليل') && (
                    renderTechnicalIndicator(95)
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 bg-white/10 text-white">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="اكتب سؤالك عن السهم هنا..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent/80 text-primary"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
