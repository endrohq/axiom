import { ArrowLeftOutlined } from '@shared/components/icons/ArrowLeftOutlined';
import { ClaimOutlined } from '@shared/components/icons/ClaimOutlined';
import { MinusCircleOutlined } from '@shared/components/icons/MinusCircleOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import {
  getEtherScanTxRoute,
  ROUTE_LANDING_PAGE,
} from '@shared/utils/route.utils';
import { getShortenedFormat } from '@shared/utils/string.utils';
import Link from 'next/link';

export function Header() {
  const { claim } = useClaimDetails();
  if (!claim) return <></>;

  return (
    <>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href={ROUTE_LANDING_PAGE}
            className="flex cursor-pointer items-center space-x-1 border-r border-gray-300 py-1 pr-4 text-xs leading-none text-gray-500 hover:text-primary"
          >
            <div>
              <ArrowLeftOutlined />
            </div>
            <div className="">Back</div>
          </Link>
          <Link
            href={getEtherScanTxRoute(claim?.id)}
            target="_blank"
            className="bg-transition rounded text-xs font-medium leading-none text-gray-700 hover:text-primary"
          >
            ID: {getShortenedFormat(claim?.id)}
          </Link>
        </div>
        <div>
          <div className="flex items-center space-x-2 text-xs">
            <div className="text-gray-500">Reported By</div>
            <div className="text-gray-600">
              {getShortenedFormat(claim?.createdBy)}
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-2 rounded bg-[#010417] p-2">
        <div className="flex items-center justify-between">
          <div className=" flex items-center space-x-3">
            <div>
              <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-purple-200 text-xl text-purple-900">
                <ClaimOutlined />
              </div>
            </div>
            <div className="text-sm text-gray-200">
              <span className="font-bold text-white">
                {claim?.origin || '-'}
              </span>{' '}
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
          <p className="w-11/12 text-base font-medium leading-relaxed text-black">
            {claim?.claim}
          </p>
        </div>
      </div>
    </>
  );
}
