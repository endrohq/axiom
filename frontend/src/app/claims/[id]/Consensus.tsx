import { useClaimDetails } from '@shared/hooks/useClaimDetails';

export default function Consensus() {
  const { claim } = useClaimDetails();
  return (
    <div>
      <div className="mb-0 flex items-center pb-3">
        <div className="w-full items-center">
          <div className="text-xs font-medium text-blue-700">Status</div>
          <div className="text-base font-semibold">In Progress</div>
        </div>
      </div>
      <div className="mb-6 rounded border border-dashed border-gray-300 bg-gray-50 p-4 text-xs">
        This claim is currently being fact checked by 3 people. The consensus
      </div>
    </div>
  );
}
