import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { supabase } from "@/integrations/supabase/client";
interface Message {
  role: 'user' | 'assistant';
  content: string;
}
export const ChatBot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    toast
  } = useToast();
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
      // @ts-ignore - We know this table exists even if types don't reflect it
      const {
        data,
        error
      } = await supabase.from('secrets').select('value').eq('name', 'GEMINI_API_KEY').single();
      if (error) {
        throw new Error("حدث خطأ في الوصول إلى مفتاح API");
      }
      if (!data?.value) {
        throw new Error("لم يتم العثور على مفتاح API");
      }
      const genAI = new GoogleGenerativeAI(data.value);
      const model = genAI.getGenerativeModel({
        model: "gemini-pro"
      });
      const prompt = `أنت محلل مالي متخصص في الأسواق المالية العربية مع تركيز خاص على توقعات وتحليلات عام 2025. عليك تقديم تحليل وتوصيات بنسبة ثقة 95% أو أعلى.

      قواعد مهمة يجب اتباعها:
      1. قدم تحليلات وتوقعات تركز على عام 2025
      2. قدم إجابات مباشرة ومختصرة وواضحة
      3. كل توصية يجب أن تكون مدعومة بتحليل فني
      4. حدد نسبة المخاطرة بدقة لكل توصية
      5. اذكر نقاط الدخول والخروج بشكل محدد مع توقعات 2025
      6. اعتمد فقط على المؤشرات الفنية الموثوقة
      7. قدم التحليل باللغة العربية فقط
      8. قدم توقعات مستقبلية للسوق في 2025

      يجب أن تحتوي إجابتك على:
      - التحليل الفني المفصل مع المؤشرات وتوقعات 2025
      - نقاط الدخول المثالية (السعر المحدد) مع النظرة المستقبلية
      - نقاط الخروج للربح والخسارة
      - نسبة المخاطرة والعائد المتوقع في 2025
      - توصية نهائية واضحة (شراء/بيع/انتظار)
      - مستويات الدعم والمقاومة الرئيسية المتوقعة في 2025

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
        errorMessage = "حدث خطأ في الاتصال بالخدمة. يرجى التحقق من المفتاح والمحاولة مرة أخرى.";
      } else if (error.status === 403) {
        errorMessage = "خطأ في التحقق من صحة المفتاح. يرجى التحقق من صحة المفتاح.";
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
    return <div className="mt-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 shadow-lg border border-gray-700">
        <div className="flex justify-between items-center">
          <span className="text-white font-semibold text-lg">مستوى الثقة في تحليلات 2025</span>
          <span className={`${value >= 90 ? 'text-green-400' : 'text-yellow-400'} font-bold text-lg`}>
            {value}%
          </span>
        </div>
        <div className="mt-3 h-3 bg-gray-700 rounded-full overflow-hidden">
          <div className={`h-full rounded-full transition-all duration-500 ${value >= 90 ? 'bg-gradient-to-r from-green-400 to-green-500' : 'bg-gradient-to-r from-yellow-400 to-yellow-500'}`} style={{
          width: `${value}%`
        }} />
        </div>
      </div>;
  };
  return <Card className="backdrop-blur-sm bg-gradient-to-br from-gray-900/90 to-gray-800/90 border border-white/20 shadow-xl">
      <CardHeader className="flex flex-row items-center gap-3 bg-gradient-to-r from-gray-950 to-gray-900 rounded-t-lg border-b border-white/10">
        <div className="flex items-center gap-3 my-0 py-0 px-[29px] mx-0">
          <img src="/lovable-uploads/4a3e905d-f67b-4cbe-a0bc-3b7235a83584.png" alt="AI Assistant" className="w-16 h-16 rounded-full border-2 border-accent/50 hover:scale-110 transition-transform duration-300" />
          <h3 className="bg-gradient-to-r from-white to-gray-300 bg-clip-text mx-[21px] my-[11px] text-amber-500 font-semibold text-3xl">المساعد الذكي</h3>
        </div>
      </CardHeader>
      <CardContent className="bg-gradient-to-b from-gray-950 to-gray-900 p-4">
        <div className="h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-stone-950/80 rounded-lg">
            {messages.map((message, index) => <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}>
                <div className={`rounded-lg px-5 py-3 max-w-[80%] shadow-lg ${message.role === 'user' ? 'bg-gradient-to-r from-accent to-yellow-500 text-primary font-medium ml-auto' : 'bg-gradient-to-r from-gray-800 to-gray-700 text-white border border-white/10'}`}>
                  <div className="leading-relaxed tracking-wide">
                    {message.content}
                  </div>
                  {message.role === 'assistant' && message.content.includes('تحليل') && renderTechnicalIndicator(95)}
                </div>
              </div>)}
            {isLoading && <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-700 text-white">
                  <Loader2 className="h-5 w-5 animate-spin" />
                </div>
              </div>}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-3">
            <Input value={input} onChange={e => setInput(e.target.value)} placeholder="اكتب سؤالك عن توقعات السهم في 2025..." className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-accent/50 transition-all" />
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-accent to-yellow-500 hover:from-accent/90 hover:to-yellow-500/90 text-primary font-medium px-6 transition-all duration-300">
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>;
};