import { SnapsGlobalObject } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';

/**
 *
 * @param claim
 */
async function handleCreate(claim: CreateClaimFunctionProps) {
  try {
    if (!claim?.assumption) {
      return;
    }
    await setLoading(true);
    const cid = await uploadFile({
      claim: claim.claim,
      source: claim.source,
      topics: claim.topics,
    });
    setOnChainProps({ cid, assumption: claim.assumption });
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @param props
 */
async function handleTxnWrite(props: any) {
  try {
    const receipt = await writeContract?.createClaim(
      onChainProps?.cid,
      onChainProps?.assumption,
    );
    await receipt.wait();
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

/**
 *
 * @param snap
 * @param messageRequest
 */
export async function createClaim(
  snap: SnapsGlobalObject,
  messageRequest: any,
): Promise<any> {
  return await snap.request({
    method: 'snap_dialog',
    params: {
      type: 'confirmation',
      content: panel([
        text(`Hello, **${origin}**!`),
        text('This custom confirmation is just for display purposes.'),
        text(
          'But you can edit the snap source code to make it do something, if you want to!',
        ),
      ]),
    },
  });
}
