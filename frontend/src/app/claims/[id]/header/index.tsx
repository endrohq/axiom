import { ArrowLeftOutlined } from '@shared/components/icons/ArrowLeftOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import { getEtherScanTxRoute, ROUTE_CLAIMS } from '@shared/utils/route.utils';
import { getShortenedFormat } from '@shared/utils/string.utils';
import Link from 'next/link';

export function Header() {
  const { claim } = useClaimDetails();
  if (!claim) return <></>;
  return (
    <div className="mb-2 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Link
          href={ROUTE_CLAIMS}
          className="flex cursor-pointer items-center space-x-1 border-r border-gray-100 py-1 pr-4 text-xs leading-none text-gray-500 hover:text-primary"
        >
          <div>
            <ArrowLeftOutlined />
          </div>
          <div className="">Back</div>
        </Link>
        <Link
          href={getEtherScanTxRoute(claim?.id)}
          target="_blank"
          className="bg-transition rounded text-xs font-medium leading-none text-gray-600 hover:text-primary"
        >
          ID: {getShortenedFormat(claim?.id)}
        </Link>
      </div>
    </div>
  );
}
