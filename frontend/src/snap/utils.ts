import { defaultSnapOrigin } from './config';

export function hasMetaMask(): boolean {
  if (!window.ethereum) {
    return false;
  }
  return window.ethereum.isMetaMask;
}

export type GetSnapsResponse = {
  [k: string]: {
    permissionName?: string;
    id?: string;
    version?: string;
    initialPermissions?: { [k: string]: unknown };
  };
};
async function getWalletSnaps(): Promise<GetSnapsResponse> {
  return await window.ethereum.request({
    method: 'wallet_getSnaps',
  });
}

export async function isMetamaskSnapsSupported(): Promise<boolean> {
  try {
    await getWalletSnaps();
    return true;
  } catch (e) {
    return false;
  }
}

/**
 *
 * @returns
 */
export async function isSnapInstalled(
  snapOrigin: string,
  version?: string,
): Promise<boolean> {
  try {
    return !!Object.values(await getWalletSnaps()).find(
      permission =>
        permission.id === snapOrigin &&
        (!version || permission.version === version),
    );
  } catch (e) {
    console.error('Failed to obtain installed snaps', e);
    return false;
  }
}

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
) => {
  await window.ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        wallet_snap: {
          [snapId]: {
            ...params,
          },
        },
      },
    ],
  });
};
