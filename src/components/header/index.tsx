import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
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
          <Link href="/" className="text-base font-semibold text-white">
            Axiom
          </Link>
        </div>
        <div className="flex cursor-pointer items-center space-x-8">
          <UserDetails />
        </div>
      </div>
    </div>
  );
}
