import { Claim } from '@shared/typings';
import { useEffect, useState } from 'react';

const arr: Claim[] = [
  {
    id: '0x590b72e8244aa9b94a6bc33962b2aec807835473198da250a013930c7c670d2f',
    cid: 'sdfds',
    claim:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quod voluptate voluptatem quos exercitationem quas doloribus quidem voluptatibus. Quisquam',
    source: 'ChatGPT',
  },
  {
    id: '0x43c875ff862b276db59fe75e3acf18221253e0485eae68900854db4be728a6c5',
    cid: 'sdfds',
    claim:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quod voluptate voluptatem quos exercitationem quas doloribus quidem voluptatibus. Quisquam',
    source: 'Axiom',
  },
  {
    id: '0x8b1953d79780feb1080a8f9e71bb47ec22b216050a523f377d0187ad67a9af73',
    cid: 'sdfds',
    claim:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quod voluptate voluptatem quos exercitationem quas doloribus quidem voluptatibus. Quisquam',
    source: 'Google Bard',
  },
  {
    id: '0x866872b63147289afda2ddc314f285a2d7b69368f91ee49dbcfd9b1c55669077',
    cid: 'sdfds',
    claim:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quod voluptate voluptatem quos exercitationem quas doloribus quidem voluptatibus. Quisquam',
    source: 'ChatGPT',
  },
  {
    id: '0x866872b63147289afda2ddc314f285a2d7b69368f91ee49dbcfd9b1c55669077',
    cid: 'sdfds',
    claim:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quod voluptate voluptatem quos exercitationem quas doloribus quidem voluptatibus. Quisquam',
    source: 'Google Bard',
  },
];

export function useClaims() {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      setTimeout(() => {
        setClaims(arr);
      }, 500);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, claims };
}
