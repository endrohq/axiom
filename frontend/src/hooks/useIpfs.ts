'use client';

const projectId = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_API_SECRET;

const URI = 'https://ipfs.infura.io:5001/api/v0';

import { create } from 'ipfs-http-client';

const ipfs = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: `Basic ${btoa(
      `${process.env.NEXT_PUBLIC_INFURA_API_KEY}:${process.env.NEXT_PUBLIC_INFURA_API_SECRET}`,
    )}`,
  },
});

const headers = {
  Authorization: `Basic ${btoa(`${projectId}:${projectSecret}`)}`,
};

export function useIpfs() {
  async function uploadFile(data: Record<string, any>) {
    const jsonAsString = JSON.stringify(data);
    const jsonAsBuffer = Buffer.from(jsonAsString);

    const result = await ipfs.add(jsonAsBuffer);
    console.log('Uploaded JSON:', result);
    return result.path;
  }

  async function readFile(
    cid: string,
  ): Promise<Record<string, any> | undefined> {
    const url = `${URI}/cat?arg=${cid}`;
    const response = await fetch(url, { headers, method: 'POST' });
    const text = await response.text();

    try {
      return JSON.parse(text);
    } catch (err) {
      console.error('Could not parse response:', err);
    }
  }

  return { uploadFile, readFile };
}
