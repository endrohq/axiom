import { maxFactCheckersCount } from '@env';
import { CheckCircleOutlined } from '@shared/components/icons/CheckCircleOutlined';
import { ClockOutlined } from '@shared/components/icons/ClockOutlined';
import { WarningOutlined } from '@shared/components/icons/WarningOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';
import clsx from 'clsx';

export default function Consensus() {
  const { claim } = useClaimDetails();

  const hasAllFactCheckersWithVerdict =
    claim?.factCheckers?.length === maxFactCheckersCount &&
    claim?.factCheckers?.every(item => !!item.verdict);

  const verdict = hasAllFactCheckersWithVerdict && claim.verdict?.toString();
  const isCorrect = verdict === 'TRUE';
  const isIncorrect = verdict === 'FALSE';

  return (
    <div>
      <div className="mb-0 flex items-center pb-3">
        <div className="w-full items-center">
          <div className="text-xs font-medium text-blue-700">Status</div>
          <div className="text-base font-semibold">
            {verdict ? 'Concluded' : 'In Progress'}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'mb-6 flex items-center space-x-4 rounded border border-dashed p-4 ',
          {
            'border-green-500 bg-green-50': isCorrect,
            'border-red-500 bg-red-50': isIncorrect,
            'border-gray-300 bg-gray-50': !isIncorrect && !isCorrect,
          },
        )}
      >
        <div
          className={clsx(
            'flex h-10 w-10 items-center justify-center rounded',
            {
              'bg-green-200': isCorrect,
              'bg-red-200': isIncorrect,
              'bg-gray-200': !isIncorrect && !isCorrect,
            },
          )}
        >
          {isIncorrect ? (
            <WarningOutlined className="text-xl text-red-700" />
          ) : isCorrect ? (
            <CheckCircleOutlined className="text-xl text-green-700" />
          ) : (
            <ClockOutlined className=" text-2xl text-gray-400" />
          )}
        </div>
        {verdict ? (
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>
              The above claim made by{' '}
              <span className="text-black">{claim?.origin || '-'}</span> is:
            </span>
            <div
              className={clsx('text-base font-medium capitalize', {
                'text-green-900': hasAllFactCheckersWithVerdict && isCorrect,
                'text-red-900': hasAllFactCheckersWithVerdict && isIncorrect,
                'text-gray-900': !isIncorrect && !isCorrect,
              })}
            >
              {(verdict || '')?.toLowerCase()}
            </div>
          </div>
        ) : (
          <div className="text-sm">Pending</div>
        )}
      </div>
    </div>
  );
}
