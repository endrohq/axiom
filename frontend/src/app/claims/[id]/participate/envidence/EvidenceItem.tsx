import { CancelButton } from '@shared/components/button/_CancelButton';
import { ArrowDownOutlined } from '@shared/components/icons/ArrowDownOutlined';
import InputText from '@shared/components/input/InputText';
import { useDebouncedValue } from '@shared/hooks/useDebouncedValue';
import { Evidence } from '@shared/typings';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface EvidenceItemProps {
  handleRemove(index: number): void;
  evidence: Evidence;
  index: number;
  handleEvidenceChange(evidence: Evidence, index: number): void;
}

const URI = 'http://localhost:8080/api/scrape';

export default function EvidenceItem({
  handleRemove,
  evidence,
  index,
  handleEvidenceChange,
}: EvidenceItemProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(evidence.url || '');
  const [scrapedData, setScrapedData] = useState<any>(null);
  const debouncedUrl = useDebouncedValue(url, 500);

  useEffect(() => {
    if (debouncedUrl) {
      setLoading(true);
      handleScape(debouncedUrl);
    }
  }, [debouncedUrl]);

  async function handleScape(url: string) {
    try {
      const response = await fetch(URI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setScrapedData(data);
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className=" space-y-2 rounded-sm border border-gray-100 bg-gray-50 px-4 py-3"
      key={index}
    >
      <div className="flex items-start justify-between">
        <div className="text-sm font-medium text-gray-800">
          Evidence #{index + 1}
        </div>
        <CancelButton cancel={() => handleRemove(index)} />
      </div>
      <InputText
        loading={loading}
        onChange={url => setUrl(url)}
        value={url}
        type="url"
        id="evidence"
        className="text-sm"
        placeholder="https://example.com"
      />

      {scrapedData && (
        <div className="mt-2 flex items-center space-x-4 rounded border bg-white p-2">
          <div className="h-14 w-14 overflow-hidden rounded bg-gray-50">
            {scrapedData?.image && (
              <img
                className="h-14 w-14 object-cover"
                src={scrapedData.image}
                alt="scraped image"
              />
            )}
          </div>
          <div>
            <div className="font-gray-700 text-sm font-medium">
              {scrapedData.title}
            </div>
            <div className="w-6/12 overflow-hidden whitespace-nowrap text-xs text-gray-500">
              {scrapedData.description}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
