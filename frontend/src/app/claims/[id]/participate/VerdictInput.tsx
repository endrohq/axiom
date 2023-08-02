import clsx from 'clsx';

interface VerdictInputItemProps {
  id: string;
  onClick(id: string): void;
  isActive: boolean;
}

function VerdictInputItem({ id, onClick, isActive }: VerdictInputItemProps) {
  return (
    <div
      onClick={() => onClick(id)}
      className={clsx(
        'bg-transition w-full cursor-pointer rounded border py-2.5 text-center text-xs capitalize hover:brightness-90',
        {
          'bg-black text-white border-black': isActive,
          'bg-white': !isActive,
        },
      )}
    >
      {id}
    </div>
  );
}

interface VerdictInputProps {
  verdict: string;
  select(verdict: string): void;
}

export function VerdictInput({ verdict, select }: VerdictInputProps) {
  return (
    <div className="w-full space-y-3">
      <div className="text-base font-semibold text-gray-900">Verdict</div>
      <div className="grid grid-cols-3 gap-2 rounded">
        <VerdictInputItem
          id="true"
          onClick={select}
          isActive={verdict === 'true'}
        />
        <VerdictInputItem
          id="false"
          onClick={select}
          isActive={verdict === 'false'}
        />
        <VerdictInputItem
          id="unclear"
          onClick={select}
          isActive={verdict === 'unclear'}
        />
      </div>
    </div>
  );
}
