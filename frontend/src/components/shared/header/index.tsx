import { MenuItem } from '@shared/components/header/MenuItem';
import { NetworkIndicator } from '@shared/components/header/NetworkIndicator';
import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import {
  ROUTE_LANDING_PAGE,
  ROUTE_CHAT,
  ROUTE_BLOG,
} from '@shared/utils/route.utils';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const UserDetails = dynamic(() => import('./userDetails'), {
  ssr: false,
  loading: () => <LoadingOutlined />,
});

export function Header() {
  return (
    <div className="h-16 w-full bg-black">
      <div className="mx-auto flex h-full w-full items-center justify-between pl-8 pr-4">
        <div className="flex items-center justify-between space-x-10">
          <Link
            href={ROUTE_LANDING_PAGE}
            className="text-base font-semibold text-white"
          >
            Axiom
          </Link>
          <div className="flex items-center space-x-4">
            <MenuItem label="Demo Chat" href={ROUTE_CHAT} />
            <MenuItem label="Blog" href={ROUTE_BLOG} />
          </div>
        </div>
        <div className="flex h-full cursor-pointer items-center space-x-2">
          <NetworkIndicator />
          <UserDetails />
        </div>
      </div>
    </div>
  );
}
