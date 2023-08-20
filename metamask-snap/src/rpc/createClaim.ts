import type { SnapsGlobalObject } from '@metamask/snaps-types';
import { heading, panel, text } from '@metamask/snaps-ui';
import { ethers } from 'ethers';

import { claimsContract } from '../config/claims';

/**
 *
 * @param props
 */
async function handleTxnWrite(props: any) {
  try {
    const contract = new ethers.Contract(
      claimsContract.address,
      claimsContract.abi,
    );
    const receipt = await contract?.createClaim(
      props?.claim,
      props?.assumption,
      props?.origin,
    );
    await receipt.wait();
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param snap
 * @param _
 */
export async function createClaim(
  snap: SnapsGlobalObject,
  _: string,
): Promise<any> {
  return await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'prompt',
      content: panel([
        heading('What was mentioned by the claim?'),
        text('Please enter the wallet address to be monitored'),
      ]),
      placeholder: '0x123...',
    },
  });
}
