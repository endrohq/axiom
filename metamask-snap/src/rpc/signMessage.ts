import { SnapsGlobalObject } from '@metamask/snaps-types';
import { panel, text } from '@metamask/snaps-ui';

/**
 *
 * @param snap
 * @param messageRequest
 */
export async function signMessage(
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
