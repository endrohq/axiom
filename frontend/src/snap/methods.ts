import { MetamaskAxiomSnap } from './snap';
import { MetamaskAxiomRpcRequest, SignMessageResponse } from './types';

export async function createClaim(
  this: MetamaskAxiomSnap,
  message: string,
): Promise<SignMessageResponse> {
  return await sendSnapMethod(
    { method: 'fil_signMessage', params: { message } },
    this.snapId,
  );
}

async function sendSnapMethod<T>(
  request: MetamaskAxiomRpcRequest,
  snapId: string,
): Promise<T> {
  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: {
      request,
      snapId,
    },
  });
}

export async function configure(
  this: MetamaskAxiomSnap,
  configuration: Record<string, any>,
): Promise<void> {
  return await sendSnapMethod(
    { method: 'fil_configure', params: { configuration } },
    this.snapId,
  );
}
