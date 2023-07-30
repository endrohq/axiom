export const abi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: 'claimID',
        type: 'uint256',
      },
    ],
    name: 'ClaimCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    name: 'claims',
    outputs: [
      {
        internalType: 'string',
        name: 'ipfsClaimDetailsHash',
        type: 'string',
      },
      {
        internalType: 'string',
        name: 'ipfsFinalVerdictHash',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [],
    name: 'commitWindow',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: '_ipfsClaimDetailsHash',
        type: 'string',
      },
    ],
    name: 'createClaim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_claimID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_factCheckerAddress',
        type: 'address',
      },
    ],
    name: 'registerFactChecker',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_claimID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_factCheckerAddress',
        type: 'address',
      },
      {
        internalType: 'string',
        name: '_ipfsVerdictHash',
        type: 'string',
      },
    ],
    name: 'commitToFactCheck',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_claimID',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_factCheckerAddress',
        type: 'address',
      },
    ],
    name: 'checkCommitment',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];
