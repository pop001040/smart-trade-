
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { messages } = await req.json()
    const openAIKey = Deno.env.get('OPENAI_API_KEY')

    if (!openAIKey) {
      throw new Error('مفتاح OpenAI غير مكوّن')
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: `
              أنت مساعد مالي خبير متخصص في الأسواق المالية العربية والعالمية.
              أجب دائماً باللغة العربية.
              قدم تحليلات مالية دقيقة وشاملة.
              عندما تتحدث عن الأسهم، قدم مؤشرات فنية ونصائح استثمارية.
              استخدم مصطلحات مالية عربية.
              كن دقيقاً في تقديم الأرقام والإحصائيات.
            `
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 800
      }),
    })

    const data = await response.json()
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: 'عذراً، حدث خطأ في معالجة طلبك. يرجى المحاولة مرة أخرى.'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
