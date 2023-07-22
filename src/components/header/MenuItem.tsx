import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface MenuItemProps {
  label: string;
  href: string;
}

export function MenuItem({ label, href }: MenuItemProps) {
  const router = useRouter();
  const className = href === router.pathname ? 'text-black' : 'text-gray-600';
  return (
    <Link
      href={href}
      className={clsx(
        'text-sm font-medium transition-all duration-500 hover:text-black',
        className,
      )}
    >
      {label}
    </Link>
  );
}
