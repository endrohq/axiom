import { CloseOutlined } from '@shared/components/icons/CloseOutlined';

interface CancelButtonProps {
  cancel?(): void;
  iconSize?: 'text-xs' | string;
}

export function CancelButton({
  cancel,
  iconSize = 'text-xs',
}: CancelButtonProps) {
  return (
    <div
      onClick={cancel}
      className="cursor-pointer rounded bg-gray-50 px-1 text-gray-600 transition-all duration-500 hover:bg-red-50 hover:text-red-700"
    >
      <CloseOutlined className={iconSize} />
    </div>
  );
}
