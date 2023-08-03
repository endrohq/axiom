// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25 <0.9.0;

contract FactCheck {
  address owner;

  struct FactChecker {
    address factCheckerAddress;
    string ipfsVerdictHash;
    uint timestamp;
  }

  struct Claim {
    bytes32 id;
    string cid;
    FactChecker[] factCheckers;
  }

  uint public commitWindow = 1 hours;  // Adjust as needed

  // Event declaration
  event ClaimCreated(bytes32 claimId);
  event FactCheckerRegistered(bytes32 claimId, address factCheckerAddress);
  event VerdictSubmitted(bytes32 claimId, address factCheckerAddress, string ipfsVerdictHash);

  mapping(bytes32 => Claim) public claims;
  bytes32[] public claimIds;

  constructor() {
    owner = msg.sender;
  }

  function createClaim(string memory _cid) public {
    bytes32 claimId = keccak256(abi.encodePacked(_cid));
    claims[claimId].id = claimId;
    claims[claimId].cid = _cid;

    claimIds.push(claimId);

    emit ClaimCreated(claimId);
  }

  function registerFactChecker(bytes32 _claimId) public {
    Claim storage claim = claims[_claimId];
    claim.factCheckers.push(FactChecker({
      factCheckerAddress: msg.sender,
      ipfsVerdictHash: "",
      timestamp: block.timestamp
    }));

    emit FactCheckerRegistered(_claimId, msg.sender);
  }

  function submitVerdict(bytes32 _claimId, string memory _ipfsVerdictHash) public {
    Claim storage claim = claims[_claimId];

    // Find the fact checker in the claim's factCheckers array and update their ipfsVerdictHash
    for (uint i = 0; i < claim.factCheckers.length; i++) {
      if (claim.factCheckers[i].factCheckerAddress == msg.sender) {
        claim.factCheckers[i].ipfsVerdictHash = _ipfsVerdictHash;
        emit VerdictSubmitted(_claimId, msg.sender, _ipfsVerdictHash);
        return;
      }
    }

    revert("Caller is not a fact checker for this claim.");
  }

  function getClaim(bytes32 _claimId) public view returns (Claim memory) {
    return claims[_claimId];
  }

  function getClaimsByPage(uint page) public view returns (Claim[] memory) {
    uint size = 4;

    uint tokenCount = claimIds.length;
    uint start = page * size;
    uint end = start + size;

    // Ensure the start index is not out of bounds
    require(start < tokenCount, "Start index out of bounds");

    // Adjust the end index if it's out of bounds
    if (end > tokenCount) {
      end = tokenCount;
    }

    Claim[] memory claimPage = new Claim[](end - start);

    for (uint i = 0; i < (end - start); i++) {
      bytes32 id = claimIds[start + i];
      claimPage[i] = claims[id];
    }
    return claimPage;
  }
}
