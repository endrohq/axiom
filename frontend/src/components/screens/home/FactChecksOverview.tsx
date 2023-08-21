'use client';

import { useClaims } from '@shared/hooks/useClaims';

import { isArrayWithElements } from '@shared/utils/array.utils';

import ClaimCard from './ClaimCard';

export default function FactChecksOverview() {
  const { claims } = useClaims();

  return (
    <div className="relative mx-auto w-8/12 border-t border-dashed border-purple-200 py-20">
      <div className=" pointer-events-none absolute -left-10 top-0 -z-10 m-0 p-0 text-[25rem] font-bold leading-none text-gray-100">
        2
      </div>
      <div className="mb-6 w-6/12">
        <h3 className="mb-1 text-2xl font-bold">Fact Checks</h3>
        <p className="text-base leading-relaxed text-gray-800">
          Axiom is quite simple. Anyone can create flag a message as a claim
          where the user makes an assumption if the sentence is 'true', 'false'
          or 'unverifiable'.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {claims?.map((claim, index) => (
          <ClaimCard claim={claim} key={index} index={index} />
        ))}
        {!isArrayWithElements(claims) && (
          <div className="bg-transition mb-2 w-full rounded border border-dashed border-purple-200 bg-gray-50 hover:border-purple-300 hover:bg-purple-50/25">
            <div className="p-4">
              <div className="w-full text-sm text-gray-500">
                No claims found
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
