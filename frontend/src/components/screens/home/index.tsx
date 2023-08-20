'use client';

import { Topic } from '@shared/components/topics/Topic';
import { useClaims } from '@shared/hooks/useClaims';
import { NlpTopic } from '@shared/typings';

import ClaimCard from './ClaimCard';

interface TopicWithCount {
  topic: NlpTopic;
  count: number;
}

export default function Home() {
  const { claims } = useClaims();

  const topicsWithCount = claims?.reduce((acc, claim) => {
    claim.topics?.forEach(topic => {
      if (!acc[topic?.label])
        acc[topic?.label] = {
          count: 1,
          topic,
        };
      else {
        acc[topic?.label].count = acc[topic?.label].count + 1;
      }
    });
    return acc;
  }, {} as Record<string, TopicWithCount>);

  const claimsByStatus = claims?.reduce((acc, claim) => {
    const label = claim.verdict ? 'Fact Checks' : 'In Progress';
    if (!acc[claim.verdict]) acc[label] = [claim];
    else acc[label].push(claim);
    return acc;
  }, {} as Record<string, typeof claims>);

  const hasValues =
    claimsByStatus &&
    Object.values(claimsByStatus)?.some(val => val.length > 0);

  return (
    <>
      <div className=" w-full space-y-2 bg-gray-900 py-28 text-center">
        <h1 className="text-4xl font-bold text-white">
          Fact-Checking the world
        </h1>
        <h2 className="text-xl font-extralight text-gray-100">
          Helping humanity to find the truth
        </h2>
      </div>
      <div className="mx-auto mt-20 flex w-8/12 items-start">
        <div className="w-7/12">
          <div className="">
            <div className="space-y-4">
              <div className="text-base font-bold">Fact Checks</div>
              <div>
                {claims?.map((claim, index) => (
                  <ClaimCard claim={claim} key={index} index={index} />
                ))}
              </div>
            </div>
            {!hasValues && (
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
        <div className="ml-6 w-5/12 border-l border-gray-100 pl-6">
          <div className="mb-4 text-sm font-bold">Tags</div>
          <div className="flex flex-wrap items-center gap-2">
            {topicsWithCount &&
              Object.keys(topicsWithCount).map((key: string, index: number) => (
                <Topic topic={topicsWithCount?.[key].topic} key={index} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
