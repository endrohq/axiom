import { useEffect, useState } from 'react';

interface Claim {
  id: string;
  cid: string;
  claim: string;
  source: string;
}

const arr: Claim[] = [
  {
    id: '1',
    cid: 'sdfds',
    claim:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quod voluptate voluptatem quos exercitationem quas doloribus quidem voluptatibus. Quisquam',
    source: 'ChatGPT',
  },
  {
    id: '2',
    cid: 'sdfds',
    claim:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quod voluptate voluptatem quos exercitationem quas doloribus quidem voluptatibus. Quisquam',
    source: 'Axiom',
  },
  {
    id: '3',
    cid: 'sdfds',
    claim:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quod voluptate voluptatem quos exercitationem quas doloribus quidem voluptatibus. Quisquam',
    source: 'Google Bard',
  },
  {
    id: '4',
    cid: 'sdfds',
    claim:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, quibusdam, quia, quod voluptate voluptatem quos exercitationem quas doloribus quidem voluptatibus. Quisquam',
    source: 'ChatGPT',
  },
  {
    id: '5',
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
