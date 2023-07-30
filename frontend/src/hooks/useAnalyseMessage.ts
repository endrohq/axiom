import { useMemo, useState } from 'react';

const URI = 'http://localhost:8080/api/analyse';

interface AnalyseMessageProps {
  loading: boolean;
  analysis: any;
  analyse: (message: string) => Promise<void>;
}

export function useAnalyseMessage(): AnalyseMessageProps {
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState<any>(null);

  async function handleAnalyse(message: string) {
    try {
      const response = await fetch(URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: message }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setAnalysis(data);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  return useMemo(
    () => ({ analysis, analyse: handleAnalyse, loading }),
    [analysis, loading],
  );
}
