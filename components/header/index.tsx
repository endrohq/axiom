import Link from 'next/link';

import { Button } from '../button';

export function Header() {
  return (
    <div className="h-16 w-full bg-black">
      <div className="mx-auto flex h-full w-full items-center justify-between px-5">
        <div className="flex items-center justify-between space-x-10">
          <Link href="/" className="text-lg font-semibold text-white">
            AXIO️M
          </Link>
        </div>
        <div className="flex cursor-pointer items-center space-x-8">
          <Button variant="primary">Connect</Button>
        </div>
      </div>
    </div>
  );
}
