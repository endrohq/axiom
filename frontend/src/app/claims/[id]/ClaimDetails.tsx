import { ClaimOutlined } from '@shared/components/icons/ClaimOutlined';
import { MinusCircleOutlined } from '@shared/components/icons/MinusCircleOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';

export function ClaimDetails() {
  const { claim } = useClaimDetails();
  if (!claim) return <></>;
  return (
    <div className="space-y-2 rounded bg-[#002528] p-2">
      <div className="flex items-center justify-between">
        <div className=" flex items-center space-x-3">
          <div>
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/10 text-xl text-purple-900">
              <ClaimOutlined />
            </div>
          </div>
          <div className="text-sm text-gray-200">
            <span className="font-bold text-white">{claim?.source || '-'}</span>{' '}
            mentioned following claim
          </div>
        </div>
        <div className="ml-auto">
          <div className="flex items-center space-x-1 rounded bg-gray-900 px-1.5 text-white">
            <span>
              <MinusCircleOutlined className="mb-1 text-base" />
            </span>
            <span className="py-2 text-[11px] font-medium uppercase leading-none">
              on-going
            </span>
          </div>
        </div>
      </div>
      <div className="rounded bg-white p-4">
        <p className="w-7/12 text-sm leading-relaxed text-black">
          {claim?.claim}
        </p>
      </div>
    </div>
  );
}
