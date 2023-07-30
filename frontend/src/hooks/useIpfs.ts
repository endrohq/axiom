'use client';

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

  async function readFile(cid: string): Promise<Record<string, any>> {
    // get content from IPFS
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }

    // Concatenate chunks and convert to string
    const content = Buffer.concat(chunks).toString();

    // If content is JSON, parse it
    let obj;
    try {
      obj = JSON.parse(content);
    } catch (e) {
      console.log('Content is not valid JSON.');
    }
    return obj;
  }

  return { uploadFile, readFile };
}
