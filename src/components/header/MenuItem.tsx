import Link from 'next/link';

interface MenuItemProps {
  label: string;
  href: string;
}

export function MenuItem({ label, href }: MenuItemProps) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-gray-300 transition-all duration-500 hover:text-white"
    >
      {label}
    </Link>
  );
}
