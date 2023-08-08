import { ClockOutlined } from '@shared/components/icons/ClockOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';

export default function Consensus() {
  const { claim } = useClaimDetails();
  console.log(claim);
  return (
    <div>
      <div className="mb-0 flex items-center pb-3">
        <div className="w-full items-center">
          <div className="text-xs font-medium text-blue-700">Status</div>
          <div className="text-base font-semibold">
            {claim?.verdict ? 'Concluded' : 'In Progress'}
          </div>
        </div>
      </div>
      <div className="mb-6 flex items-center space-x-4 rounded border border-dashed border-gray-300 bg-gray-50 p-4 ">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200">
          <ClockOutlined className="text-2xl text-gray-400" />
        </div>
        {claim?.verdict ? (
          <div className="flex items-center space-x-2 text-sm">
            <span>Research has showed that this claim is:</span>
            <div className="font-semibold capitalize">
              {claim.verdict
                ? claim.verdict?.toString()?.toLowerCase()
                : 'Pending'}
            </div>
          </div>
        ) : (
          <div className="text-sm">Pending</div>
        )}
      </div>
    </div>
  );
}
