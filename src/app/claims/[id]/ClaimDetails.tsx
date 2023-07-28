import { ClaimOutlined } from '@shared/components/icons/ClaimOutlined';
import { Claim } from '@shared/typings';

interface ClaimDetailsProps {
  claim: Claim;
}

export function ClaimDetails({ claim }: ClaimDetailsProps) {
  return (
    <div className="space-y-2 rounded bg-gray-900 p-2">
      <div className=" flex items-center space-x-3">
        <div>
          <div className="flex h-9 w-9 items-center justify-center rounded bg-primary/40 text-xl text-purple-100">
            <ClaimOutlined />
          </div>
        </div>
        <div className="text-sm text-white">
          <span className="font-bold">{claim?.source}</span> mentioned following
          claim
        </div>
      </div>
      <div className=" rounded-sm bg-gray-50 p-4">
        <p className="w-12/12 text-sm leading-relaxed text-gray-900">
          {claim?.claim}
        </p>
      </div>
    </div>
  );
}
