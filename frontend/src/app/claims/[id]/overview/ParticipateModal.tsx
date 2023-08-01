import { Button } from '@shared/components/button';
import { Modal } from '@shared/components/modal';
import { useClaimContract } from '@shared/hooks/useClaimContract';
import { ClaimContractEvents, RequestState } from '@shared/typings';

import { useEffect, useState } from 'react';

interface ParticipateModalProps {
  onClose(): void;
  isOpen: boolean;
  claimId: string;
  onSuccess(): void;
}

export function ParticipateModal({
  onClose,
  isOpen,
  claimId,
  onSuccess,
}: ParticipateModalProps) {
  const { writeContract } = useClaimContract();
  const [requestState, setRequestState] = useState<RequestState>('idle');

  useEffect(() => {
    writeContract?.on(ClaimContractEvents.FactCheckerRegistered, () =>
      onSuccess(),
    );
    return () => {
      writeContract?.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (requestState === 'loading') {
      handleParticipate();
    }
  }, [requestState]);

  async function handleParticipate() {
    try {
      const tx = await writeContract?.registerFactChecker(claimId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal bodyClassName="text-sm" open={isOpen} close={onClose}>
      <div className="mb-1 text-base font-semibold">
        You are about to participate
      </div>
      <div className="w-10/12 text-sm text-gray-600">
        It can take up to 5 minutes before starting and after that you will have
        1 hour to finish your participation.
      </div>
      <div className="mt-4 w-full">
        <Button
          onClick={() => setRequestState('loading')}
          fullSize
          variant="primary"
        >
          Participate
        </Button>
      </div>
    </Modal>
  );
}
