import { ArrowLeftOutlined } from '@shared/components/icons/ArrowLeftOutlined';
import { ShareOutlined } from '@shared/components/icons/ShareOutlined';
import { Claim } from '@shared/typings';
import { getEtherScanTxRoute, ROUTE_CLAIMS } from '@shared/utils/route.utils';
import { getShortenedFormat } from '@shared/utils/string.utils';
import Link from 'next/link';

interface HeaderProps {
  claim: Claim;
}

export function Header({ claim }: HeaderProps) {
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
          className="bg-transition hover:bg-primary/15 rounded bg-primary/10 px-4 py-2 text-xs font-medium leading-none hover:text-primary"
        >
          ID: {getShortenedFormat(claim?.id)}
        </Link>
      </div>
      <div className="ml-auto">
        <div className="rounded bg-gray-50 px-2 py-1 hover:bg-primary/10">
          <ShareOutlined className="text-lg text-gray-700" />
        </div>
      </div>
    </div>
  );
}
