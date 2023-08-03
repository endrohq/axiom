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
        internalType: 'bytes32',
        name: 'claimId',
        type: 'bytes32',
      },
    ],
    name: 'ClaimCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'claimId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'factCheckerAddress',
        type: 'address',
      },
    ],
    name: 'FactCheckerRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'bytes32',
        name: 'claimId',
        type: 'bytes32',
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'factCheckerAddress',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'ipfsVerdictHash',
        type: 'string',
      },
    ],
    name: 'VerdictSubmitted',
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
    name: 'claimIds',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32',
      },
    ],
    name: 'claims',
    outputs: [
      {
        internalType: 'bytes32',
        name: 'id',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: 'cid',
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
        name: '_cid',
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
        internalType: 'bytes32',
        name: '_claimId',
        type: 'bytes32',
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
        internalType: 'bytes32',
        name: '_claimId',
        type: 'bytes32',
      },
      {
        internalType: 'string',
        name: '_ipfsVerdictHash',
        type: 'string',
      },
    ],
    name: 'submitVerdict',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_claimId',
        type: 'bytes32',
      },
    ],
    name: 'getClaim',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'id',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'cid',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'factCheckerAddress',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'ipfsVerdictHash',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
              },
            ],
            internalType: 'struct FactCheck.FactChecker[]',
            name: 'factCheckers',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct FactCheck.Claim',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'page',
        type: 'uint256',
      },
    ],
    name: 'getClaimsByPage',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'id',
            type: 'bytes32',
          },
          {
            internalType: 'string',
            name: 'cid',
            type: 'string',
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'factCheckerAddress',
                type: 'address',
              },
              {
                internalType: 'string',
                name: 'ipfsVerdictHash',
                type: 'string',
              },
              {
                internalType: 'uint256',
                name: 'timestamp',
                type: 'uint256',
              },
            ],
            internalType: 'struct FactCheck.FactChecker[]',
            name: 'factCheckers',
            type: 'tuple[]',
          },
        ],
        internalType: 'struct FactCheck.Claim[]',
        name: '',
        type: 'tuple[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
    constant: true,
  },
];
