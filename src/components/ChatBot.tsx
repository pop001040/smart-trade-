import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MessageSquare, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
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

      const prompt = `أنت مساعد مالي خبير متخصص في الأسواق المالية العربية والعالمية.
        يجب أن تقدم تحليلاً دقيقاً جداً (بنسبة ثقة 90%) للأسهم والتوصيات المالية.
        الرجاء تقديم:
        - تحليل فني مفصل
        - مؤشرات السوق الرئيسية
        - توصيات محددة مع نسب المخاطرة
        - نقاط الدخول والخروج المقترحة

        السؤال من المستخدم هو: ${input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const assistantMessage = {
        role: 'assistant' as const,
        content: response.text()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "عذراً، لم نتمكن من معالجة طلبك. يرجى المحاولة مرة أخرى.",
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
          <span className="text-white">المؤشر الفني</span>
          <span className={`${value >= 50 ? 'text-green-400' : 'text-red-400'}`}>
            {value}%
          </span>
        </div>
        <div className="mt-2 h-2 bg-gray-700 rounded">
          <div 
            className={`h-full rounded ${value >= 50 ? 'bg-green-400' : 'bg-red-400'}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <Card className="backdrop-blur-sm bg-white/10 border border-white/20">
      <CardHeader className="flex flex-row items-center gap-2 bg-gray-950 hover:bg-gray-800">
        <MessageSquare className="w-5 h-5 text-accent" />
        <h3 className="text-xl font-bold text-white">المساعد المالي الذكي</h3>
      </CardHeader>
      <CardContent className="bg-gray-950 hover:bg-gray-800">
        <div className="h-[400px] flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 p-4 bg-stone-950 hover:bg-stone-800">
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.role === 'user' ? 'bg-accent text-primary ml-auto' : 'bg-white/10 text-white'
                }`}>
                  {message.content}
                  {message.role === 'assistant' && message.content.includes('تحليل') && (
                    renderTechnicalIndicator(90)
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-lg px-4 py-2 bg-white/10 text-white">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
          </div>
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="اكتب سؤالك هنا..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-sm"
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-accent hover:bg-accent/80 text-primary"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  );
};
