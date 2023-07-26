import { create } from 'ipfs-http-client';
import { useMemo } from 'react';

export function useIpfs() {
  const ipfs = useMemo(() => {
    // Connect to the Infura IPFS gateway
    return create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_INFURA_API_KEY}`,
      },
    });
  }, []);

  async function uploadFile(value: Record<string, any>) {
    const jsonAsString = JSON.stringify(value);
    const jsonAsBuffer = Buffer.from(jsonAsString);

    const result = await ipfs.add(jsonAsBuffer);
    console.log('Uploaded JSON:', result);
    return result;
  }

  return { uploadFile };
}
