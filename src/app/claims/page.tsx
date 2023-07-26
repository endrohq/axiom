'use client';

import { getClaimItemRoute } from '@shared/utils/route.utils';
import Link from 'next/link';

import { useClaims } from '../../hooks/useClaims';

export default function Page() {
  const { claims } = useClaims();
  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-3xl font-semibold">Claims</h1>
      <div className="mt-10 grid grid-cols-4 gap-4">
        {claims.map((claim, index) => (
          <Link
            href={getClaimItemRoute(`${index + 1}`)}
            className="bg-transition flex w-full items-center justify-center rounded bg-gray-50 py-16 text-xl font-semibold text-gray-300 hover:bg-gray-100"
            key={index}
          >
            {index + 1}
          </Link>
        ))}
      </div>
    </div>
  );
}
