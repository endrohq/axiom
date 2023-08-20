import { CancelButton } from '@shared/components/button/_CancelButton';
import InputText from '@shared/components/input/InputText';
import { useDebouncedValue } from '@shared/hooks/useDebouncedValue';
import { Evidence } from '@shared/typings';
import { useEffect, useState } from 'react';

interface EvidenceItemProps {
  evidence: Evidence;
  handleEvidenceChange(evidence: Evidence): void;
}

const URI = 'http://localhost:8080/api/scrape';

export default function EvidenceItem({
  evidence,
  handleEvidenceChange,
}: EvidenceItemProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string | undefined>(evidence.url || '');
  const [hasErrorLoadingImage, setHasErrorLoadingImage] =
    useState<boolean>(false);
  const debouncedUrl = useDebouncedValue(url, 500);

  useEffect(() => {
    setHasErrorLoadingImage(false);
  }, [evidence.image]);

  useEffect(() => {
    if (debouncedUrl) {
      setLoading(true);
      handleEvidenceChange({ ...evidence, url });
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
      handleEvidenceChange({ ...evidence, ...data, url });
    } catch (error) {
      console.error(
        'There has been a problem with your fetch operation:',
        error,
      );
    } finally {
      setLoading(false);
    }
  }

  function handleRemoveThumbnail() {
    handleEvidenceChange({});
    setUrl(undefined);
  }

  const canLoadThumbnail = !!evidence?.title;

  return (
    <>
      {canLoadThumbnail ? (
        <div className="mt-2 rounded border border-gray-100 bg-gray-50/50 px-4 py-3">
          <div className="mb-3 flex items-center justify-between border-b border-gray-100 pb-2">
            <div className="space-x-2 text-sm">
              <span className="font-bold">URL:</span>{' '}
              <a target="_blank" className="text-blue-600">
                {evidence.url}
              </a>
            </div>
            <CancelButton cancel={handleRemoveThumbnail} />
          </div>
          <div className=" flex items-center space-x-4 ">
            <div className="h-14 w-14 overflow-hidden rounded bg-gray-300">
              {evidence?.image && !hasErrorLoadingImage && (
                <img
                  className="h-14 w-14 object-cover"
                  src={evidence.image}
                  alt="scraped image"
                  onError={() => setHasErrorLoadingImage(true)}
                />
              )}
            </div>
            <div>
              <div className="font-gray-700 text-sm font-medium">
                {evidence.title}
              </div>
              <div className="w-6/12 overflow-hidden whitespace-nowrap text-xs text-gray-500">
                {evidence.description}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <InputText
          loading={loading}
          onChange={url => setUrl(url)}
          value={url}
          type="url"
          id="evidence"
          className="text-sm"
          placeholder="https://example.com"
        />
      )}
    </>
  );
}
