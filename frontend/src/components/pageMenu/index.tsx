import { MenuItem } from '@shared/typings';
import clsx from 'clsx';
import { useEffect } from 'react';

interface PageMenuProps<T> {
  menu: MenuItem<T>[];
  onClick: (item: T) => void;
  activeItem: T;
  className?: string;
}

export function PageMenu<T>({
  menu,
  onClick,
  activeItem,
  className,
}: PageMenuProps<T>) {
  useEffect(() => {
    if (menu.length > 0) {
      onClick(menu[0].id);
    }
  }, []);

  return (
    <div
      className={clsx(
        'flex flex-wrap space-x-4 border-b border-gray-200',
        className,
      )}
    >
      {menu.map((item, index) => (
        <div
          onClick={() => onClick(item.id)}
          key={index}
          className={clsx(
            'bg-transition hover: cursor-pointer border-b-2 px-2 py-2.5 text-sm hover:border-black hover:text-black',
            item.id === activeItem
              ? ' border-primary font-semibold text-primary'
              : 'border-transparent text-gray-700',
          )}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}
