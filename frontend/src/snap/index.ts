import { MetamaskAxiomSnap } from './api';
import { defaultSnapOrigin } from './config';
import {
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled,
} from './utils';

export {
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled,
} from './utils';

export type SnapInstallationParamNames = 'version' | string;

/**
 * Install and enable Filecoin snap
 *
 * Checks for existence of Metamask and version compatibility with snaps before installation.
 *
 * Provided snap configuration must define at least network property so predefined configuration can be selected.
 * All other properties are optional, and if present will overwrite predefined property.
 *
 * @param config - SnapConfig
 * @param snapOrigin
 *
 * @return MetamaskFilecoinSnap - adapter object that exposes snap API
 */
export async function enableAxiomSnap(
  snapOrigin?: string,
): Promise<MetamaskAxiomSnap> {
  const snapId = snapOrigin ?? defaultSnapOrigin;
  // check all conditions
  if (!hasMetaMask()) {
    throw new Error('Metamask is not installed');
  }

  // await connectSnap(snapId, snapInstallationParams);
  if (!(await isMetamaskSnapsSupported())) {
    throw new Error("Current Metamask version doesn't support snaps");
  }

  const isInstalled = await isSnapInstalled(snapId);

  if (!isInstalled) {
    // // enable snap
    await window.ethereum.request({
      method: 'wallet_requestSnaps',
      params: {
        [snapId]: {},
      },
    });
  }

  // await unlockMetamask();

  // create snap describer
  const api = new MetamaskAxiomSnap(snapOrigin || defaultSnapOrigin);
  // await api.connect();

  return api;
}
