import { OnRpcRequestHandler } from '@metamask/snaps-types';
import { createClaim } from './rpc/createClaim';
import { EmptyMetamaskState } from './utils/metamask.utils';

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns The result of `snap_dialog`.
 * @throws If the request method is not valid for this snap.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  const state = await snap.request({
    method: 'snap_manageState',
    params: { operation: 'get' },
  });

  if (!state) {
    // initialize state if empty and set default config
    await snap.request({
      method: 'snap_manageState',
      params: { newState: EmptyMetamaskState(), operation: 'update' },
    });
  }

  switch (request.method) {
    case 'axiom_createClaim':
      return await createClaim(snap, request.params);
    default:
      throw new Error('Method not found.');
  }
};
