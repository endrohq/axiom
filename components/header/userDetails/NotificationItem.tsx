import { AuditOutlined } from '@shared/components/icons/AuditOutlined';
import { HcsNewProposalMessage } from '@shared/typings';
import Link from 'next/link';

interface NotificationItemProps {
  message: HcsNewProposalMessage;
}

export function NotificationItem({ message }: NotificationItemProps) {
  return (
    <Link
      href={message.route}
      className="bg-transition flex items-center space-x-6 border-b border-gray-100 p-4 last:border-0 hover:bg-gray-50"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded bg-green-50">
        <AuditOutlined className="text-2xl text-green-800" />
      </div>
      <div className="flex space-x-4">
        <div className="flex flex-col">
          <div className="text-sm font-semibold">
            New Proposal @ {message.name}
          </div>
          <div className="text-xs text-gray-600">2 km away</div>
        </div>
      </div>
    </Link>
  );
}
