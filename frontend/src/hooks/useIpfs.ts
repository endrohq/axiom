'use client';

const projectId = process.env.NEXT_PUBLIC_INFURA_API_KEY;
const projectSecret = process.env.NEXT_PUBLIC_INFURA_API_SECRET;

const URI = 'https://ipfs.infura.io:5001/api/v0';

const headers = {
  Authorization: `Basic ${btoa(`${projectId}:${projectSecret}`)}`,
};

export function useIpfs() {
  async function uploadFile(input: Record<string, any>) {
    const jsonAsString = JSON.stringify(input);
    const jsonAsBuffer = Buffer.from(jsonAsString);

    const url = `${URI}/add?stream-channels=true&progress=false`;
    const formData = new FormData();
    const blob = new Blob([JSON.stringify(jsonAsBuffer)], {
      type: 'application/json',
    });
    formData.append('path', blob);

    const result = await fetch(url, {
      headers,
      method: 'POST',
      body: formData,
    });
    const response = await result?.json();
    return response.Hash;
  }

  async function readFile<T>(cid: string): Promise<T | undefined> {
    const url = `${URI}/cat?arg=${cid}`;
    const response = await fetch(url, { headers, method: 'POST' });
    const text = await response.text();

    try {
      return JSON.parse(text) as T;
    } catch (err) {
      console.error('Could not parse response:', err);
    }
  }

  return { uploadFile, readFile };
}
