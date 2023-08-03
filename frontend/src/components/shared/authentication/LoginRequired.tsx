import { Button } from '@shared/components/button';
import { useUser } from '@shared/hooks/useUser';

export function LoginRequired() {
  const { login } = useUser();

  return (
    <div className="flex flex-col items-center justify-center space-y-6 py-6">
      <div className="h-20 w-20 rounded-lg bg-gray-200" />
      <div className="space-y-1 text-center">
        <div className="text-lg font-bold">Login Required</div>
        <p className="text-center text-sm text-gray-500">
          You need to connect your wallet to flag a message.
        </p>
      </div>
      <Button onClick={login} variant="primary">
        Login
      </Button>
    </div>
  );
}
