
import { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { googleApiService } from '@/services/googleApi';
import { useToast } from '@/components/ui/use-toast';

export const GoogleApiSettings = () => {
  const [apiKey, setApiKey] = useState('');
  const { toast } = useToast();

  const handleInitializeApi = async () => {
    try {
      googleApiService.initializeApi({
        apiKey,
        enabledApis: [
          'bigquery',
          'analytics',
          'storage',
          'monitoring',
          'logging',
          'cloudsql',
          'datastore',
          'cloudtrace'
        ]
      });

      await googleApiService.loadGoogleApi();

      toast({
        title: "تم التهيئة بنجاح",
        description: "تم تهيئة Google API بنجاح",
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "خطأ",
        description: "حدث خطأ أثناء تهيئة Google API",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Card className="backdrop-blur bg-zinc-950">
      <CardHeader>
        <h2 className="text-xl font-bold text-white">إعدادات Google API</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-gray-400">Google API Key</label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="أدخل مفتاح Google API"
            className="bg-zinc-800 border-zinc-700 text-white"
          />
        </div>
        <Button
          onClick={handleInitializeApi}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          تهيئة Google API
        </Button>
      </CardContent>
    </Card>
  );
};
