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
        authorization: `Basic ${btoa(
          `${process.env.NEXT_PUBLIC_INFURA_API_KEY}:${process.env.NEXT_PUBLIC_INFURA_API_SECRET}`,
        )}`,
      },
    });
  }, []);

  async function uploadFile(value: Record<string, any>) {
    const jsonAsString = JSON.stringify(value);
    const jsonAsBuffer = Buffer.from(jsonAsString);

    const result = await ipfs.add(jsonAsBuffer);
    return result.path;
  }

  return { uploadFile };
}
