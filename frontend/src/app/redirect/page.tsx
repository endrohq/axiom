'use client';

import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { useClaims } from '@shared/hooks/useClaims';
import { isArrayWithElements } from '@shared/utils/array.utils';
import { getClaimItemRoute } from '@shared/utils/route.utils';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function App() {
  const { claims } = useClaims();
  const router = useRouter();

  useEffect(() => {
    if (isArrayWithElements(claims)) {
      const lastClaim = claims?.[claims.length - 1];
      if (lastClaim?.id) router.push(getClaimItemRoute(lastClaim.id));
    }
  }, [claims]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        <LoadingOutlined className="text-2xl" />
        <div className="text-sm">
          Almost there! We're redirecting you to the claim page
        </div>
      </div>
    </div>
  );
}
