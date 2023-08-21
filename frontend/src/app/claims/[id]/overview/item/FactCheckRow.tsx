import clsx from 'clsx';

interface FactCheckRowProps {
  label: string;
  value?: string;
  isOdd: boolean;
}

export function FactCheckRow({ label, value = '-', isOdd }: FactCheckRowProps) {
  return (
    <div
      className={clsx(
        'flex items-center justify-between border-t border-gray-100 px-4 py-3 text-xs',
        {
          'bg-gray-50': isOdd,
          'bg-white': !isOdd,
        },
      )}
    >
      <div className=" text-gray-500">{label}</div>
      <div className="font-medium text-gray-900">{value}</div>
    </div>
  );
}
