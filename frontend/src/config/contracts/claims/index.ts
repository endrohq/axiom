import process from 'process';

import { abi } from './abi';

const ADDRESS = process.env.NEXT_PUBLIC_CLAIMS_CONTRACT_ADDRESS || '';

export const claimsContract = { abi, address: ADDRESS };
