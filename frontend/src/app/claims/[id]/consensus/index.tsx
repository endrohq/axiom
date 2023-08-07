import { LoadingOutlined } from '@shared/components/icons/LoadingOutlined';
import { useClaimDetails } from '@shared/hooks/useClaimDetails';

export default function Consensus() {
  const { claim } = useClaimDetails();
  console.log(claim);
  return (
    <div>
      <div className="mb-0 flex items-center pb-3">
        <div className="w-full items-center">
          <div className="text-xs font-medium text-blue-700">Status</div>
          <div className="text-base font-semibold">In Progress</div>
        </div>
      </div>
      <div className="mb-6 flex items-center space-x-4 rounded border border-dashed border-gray-300 bg-gray-50 p-4 ">
        <div className="flex h-10 w-10 items-center justify-center rounded bg-gray-200">
          <LoadingOutlined className="text-xs text-gray-600" />
        </div>
        <div className="text-xs capitalize">
          {(claim.verdictState?.toString() || 'unknown')?.toLowerCase()}
        </div>
      </div>
    </div>
  );
}
