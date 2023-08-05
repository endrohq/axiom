import { Verdict } from '@shared/typings';
import clsx from 'clsx';

interface VerdictInputItemProps {
  verdict: Verdict;
  onClick(id: Verdict): void;
  isActive: boolean;
}

function VerdictInputItem({
  verdict,
  onClick,
  isActive,
}: VerdictInputItemProps) {
  const label = Object.keys(Verdict)[Object.values(Verdict).indexOf(verdict)];
  return (
    <div
      onClick={() => onClick(verdict)}
      className={clsx(
        'bg-transition w-full cursor-pointer rounded border py-2.5 text-center text-xs hover:brightness-90',
        {
          'bg-black text-white border-black': isActive,
          'bg-white': !isActive,
        },
      )}
    >
      <span className="capitalize">{label?.toLowerCase()}</span>
    </div>
  );
}

interface VerdictInputProps {
  verdict?: Verdict;
  description?: string;
  select(verdict: Verdict): void;
}

export function VerdictInput({
  verdict,
  select,
  description,
}: VerdictInputProps) {
  return (
    <div className="w-full space-y-3">
      <div>
        <div className="text-base font-semibold text-gray-900">Verdict</div>
        {description && (
          <div className="text-xs text-gray-600">{description}</div>
        )}
      </div>
      <div className="grid grid-cols-3 gap-2 rounded">
        <VerdictInputItem
          verdict={Verdict.TRUE}
          onClick={select}
          isActive={verdict === Verdict.TRUE}
        />
        <VerdictInputItem
          verdict={Verdict.FALSE}
          onClick={select}
          isActive={verdict === Verdict.FALSE}
        />
        <VerdictInputItem
          verdict={Verdict.UNVERIFIABLE}
          onClick={select}
          isActive={verdict === Verdict.UNVERIFIABLE}
        />
      </div>
    </div>
  );
}
