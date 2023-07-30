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
        internalType: 'bytes32',
        name: '_claimId',
        type: 'bytes32',
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
        internalType: 'bytes32',
        name: '_claimId',
        type: 'bytes32',
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
        internalType: 'bytes32',
        name: '_claimId',
        type: 'bytes32',
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
            internalType: 'string',
            name: 'ipfsClaimDetailsHash',
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
                internalType: 'bool',
                name: 'committed',
                type: 'bool',
              },
              {
                internalType: 'uint256',
                name: 'commitmentTime',
                type: 'uint256',
              },
            ],
            internalType: 'struct FactCheck.FactChecker[]',
            name: 'factCheckers',
            type: 'tuple[]',
          },
          {
            internalType: 'string',
            name: 'ipfsFinalVerdictHash',
            type: 'string',
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
            internalType: 'string',
            name: 'ipfsClaimDetailsHash',
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
                internalType: 'bool',
                name: 'committed',
                type: 'bool',
              },
              {
                internalType: 'uint256',
                name: 'commitmentTime',
                type: 'uint256',
              },
            ],
            internalType: 'struct FactCheck.FactChecker[]',
            name: 'factCheckers',
            type: 'tuple[]',
          },
          {
            internalType: 'string',
            name: 'ipfsFinalVerdictHash',
            type: 'string',
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
