'use client';

const projectId = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_API_SECRET;

const URI = 'https://ipfs.infura.io:5001/api/v0';

const headers = {
  Authorization: `Basic ${btoa(`${projectId}:${projectSecret}`)}`,
};

export function useIpfs() {
  async function uploadFile(data: Record<string, any>) {
    const url = `${URI}/add`;
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return await response.json();
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
