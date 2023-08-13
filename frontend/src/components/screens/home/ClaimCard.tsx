import { maxFactCheckersCount } from '@env';
import { ChatGptLogoFilled } from '@shared/components/icons/ChatGptLogoFilled';
import { EthAddressIcon } from '@shared/components/icons/EthAddressIcon';
import { Claim } from '@shared/typings';
import { getClaimItemRoute } from '@shared/utils/route.utils';
import { getShortenedFormat } from '@shared/utils/string.utils';
import Link from 'next/link';

interface ClaimCardProps {
  claim: Claim;
  index: number;
}

export default function ClaimCard({ claim, index }: ClaimCardProps) {
  return (
    <Link href={getClaimItemRoute(claim.id)}>
      <div className="bg-transition mb-2 w-full rounded border border-dashed border-purple-200 bg-white hover:border-purple-300 hover:bg-purple-50/25">
        <div className="flex items-center space-x-3 rounded-t bg-purple-50 px-4 py-2 text-sm">
          <div className="h-6 w-6">
            <ChatGptLogoFilled scaleWithParent />
          </div>
          <span className="text-gray-600">
            <span className=" font-medium text-gray-900">{claim.source}</span>{' '}
            mentioned
          </span>
        </div>
        <div className="p-4">
          <div className="w-full text-sm text-gray-900">{claim.claim}</div>
        </div>
        <div className="mx-4 flex items-center justify-between border-t border-dashed border-gray-200 py-3 text-xs">
          <div>
            Assumption:{' '}
            <span className="font-medium capitalize">
              {claim.assumption?.toString()?.toLowerCase()}
            </span>
          </div>
          <div>
            <span className="font-semibold">
              {claim?.factCheckers?.length}/{maxFactCheckersCount}
            </span>{' '}
            Fact Checkers
          </div>
        </div>
      </div>
    </Link>
  );
}
